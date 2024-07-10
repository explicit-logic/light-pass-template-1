'use client';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';

// Lib
import { getNextSlug, getPreviousSlug } from '@/store/slugStorage';
import { setAnswersBySlug } from '@/store/answerStorage';
import { toast } from '@/lib/client/toaster';

// Components
import QuestionFormView from './QuestionForm.view';

// Constants
import { ONE_SECOND, SECONDS_BEFORE_END, TYPES } from '@/lib/client/countdown/constants';

// Helpers
import { getEnabled as getCountdownEnabled, getTimeLimit, establishEndTime } from '@/lib/client/countdown/helpers';
import { getValidationSchema } from './helpers/getValidationSchema';
import { getEndTime, clearEndTime } from '@/lib/client/countdown/store';

// Senders
import { sendProgress } from '@/lib/client/peer/senders/sendProgress';

// Hooks
import { useRouter, useParams } from 'next/navigation';

// Types
import type { ContainerProps, Values } from './QuestionForm.types';

function QuestionFormContainer(props: ContainerProps) {
  const { formData } = props;

  const { locale, slug } = useParams<{ locale: string, slug: string }>();

  const router = useRouter();

  const validationSchema = getValidationSchema(formData);

  const tQuestion = useTranslations('Question');

  const nextSlug = getNextSlug(slug);
  const last = Boolean(!nextSlug);

  const formik = useFormik({
    initialValues: {},
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const countdownEnabled = getCountdownEnabled();

    if (countdownEnabled) {
      const now = Math.round(new Date().getTime() / ONE_SECOND);
      const endTime = getEndTime();

      if (endTime) {
        const diff = endTime - now;

        if (diff > 0) {
          const duration = (diff <= SECONDS_BEFORE_END ? diff : SECONDS_BEFORE_END) * ONE_SECOND;
          const delay = (diff <= SECONDS_BEFORE_END ? 0 : diff - SECONDS_BEFORE_END) * ONE_SECOND;

          timeoutId = setTimeout(() => {
            toast.warning(tQuestion('timeRunningOut'), {
              duration,
            });
          }, delay);
        }
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [tQuestion]);

  function goBack() {
    const previousSlug = getPreviousSlug(slug);

    if (!previousSlug) return;

    router.replace(`/${locale}/questions/${previousSlug}`);
  }

  async function onSubmit(values: Values) {
    try {
      setAnswersBySlug(slug, values);

      await sendProgress({
        answer: values,
        page: slug,
      });

      const countdownEnabled = getCountdownEnabled();

      if (countdownEnabled) {
        const timeLimit = getTimeLimit();

        if (timeLimit.type === TYPES.ONE) {
          establishEndTime(timeLimit.duration);
        }
      }

      if (last) {
        clearEndTime();
        sessionStorage.setItem('finished', 'true');
        router.replace(`/${locale}/result`);
      } else {
        router.replace(`/${locale}/questions/${nextSlug}`);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <QuestionFormView formik={formik} goBack={goBack} formData={formData} last={last} />
  );
}

export default QuestionFormContainer;
