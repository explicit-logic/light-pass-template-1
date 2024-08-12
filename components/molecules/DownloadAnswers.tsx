'use client';
// Modules
import { useTranslations } from 'next-intl';

// Components
import Button, { VARIANTS } from '@/components/atoms/Button';

// Config
import { getQuizConfig } from '@/lib/client/getQuizConfig';

// Helpers
import { downloadJson } from '@/helpers/downloadJson';
import { generateUID } from '@/helpers/generateUID';

// Lib
import { getAllAnswers } from '@/store/answerStorage';
import { getIdentity } from '@/store/identityStorage';

// Store
import { getTime } from '@/store/stopwatchStorage';

const config = getQuizConfig();

function DownloadAnswers() {
  const t = useTranslations('Result');

  const onDownload = () => {
    downloadJson({
      ...getTime(),
      quizId: config.quizId,
      identity: getIdentity(),
      answers: getAllAnswers(),
    }, `${generateUID()}.json`);
  };

  return (
    <div>
      <p className="mb-4 font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-300">
        {t('download.caption')}
      </p>
      <p>
        <Button
          type="submit"
          variant={VARIANTS.default}
          onClick={onDownload}
        >
          {t('download.button')}
        </Button>
      </p>
    </div>
  );
}

export default DownloadAnswers;
