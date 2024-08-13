'use client';

// Modules
import { useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';

// Config
import { getQuizConfig } from '@/lib/client/getQuizConfig';

// Lib
import { getAllAnswers } from '@/store/answerStorage';

// Senders
import { sendComplete } from '@/lib/client/peer/senders/sendComplete';

// Constants
import { TYPES, INTERACTIVE_TYPES } from '@/constants/block';

// Hooks
import { useParams } from 'next/navigation';

const config = getQuizConfig();

function checkPassed(block: InteractionBlock, answer: string | string[]): boolean {
  if (block.type === TYPES.RADIO_GROUP) {
    let idx = 1;
    for (const item of block.values) {
      if (idx.toString() === answer && item.selected) {
        return true;
      }
      idx += 1;
    }
  }

  if (block.type === TYPES.CHECKBOX_GROUP) {
    let idx = 1;
    let correctCount = 0;
    let allCount = 0;
    for (const item of block.values) {
      if (item.selected) {
        allCount += 1;
        if ((answer ?? []).includes(idx.toString())) {
          correctCount += 1;
        }
      }
      idx += 1;
    }

    return (allCount === correctCount);
  }

  return false;
}

let didInit = false;

function Score(props: { allBlocks: Record<string, BlocksList> }) {
  const { allBlocks } = props;

  const { locale } = useParams<{ locale: string }>();

  useEffect(() => {
    if (didInit) return;
    const allAnswers = getAllAnswers();

    didInit = true;
    void sendComplete(
      {
        language: locale,
        quizId: config.quizId,
      },
      {
        result: allAnswers,
      }
    );
  }, [locale]);


  const { passed, total } = useMemo(() => {
    const allAnswers = getAllAnswers();

    let total = 0;
    let passedCount = 0;
    for (const [slug, blocks] of Object.entries(allBlocks)) {
      for (const block of blocks) {
        if (!INTERACTIVE_TYPES?.[block.type]) continue;
        const { name } = block as InteractionBlock;

        const pageAnswers = allAnswers[slug] ?? {};
        const answer = pageAnswers[name];
        const passed = checkPassed(block as InteractionBlock, answer);
        if (passed) {
          passedCount += 1;
        }
        total += 1;
      }
    }

    return {
      passed: passedCount,
      total,
    };
  }, [allBlocks]);


  const t = useTranslations('Result');

  return (
    <div>
      <h2 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        {t('score')}
      </h2>
      <p className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white" suppressHydrationWarning>
        {passed}&nbsp;/&nbsp;{total}
      </p>
    </div>
  );
}

export default Score;
