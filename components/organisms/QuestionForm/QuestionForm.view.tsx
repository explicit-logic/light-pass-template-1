'use client';

// Modules
import { useTranslations } from 'next-intl';
import { memo, useEffect, useState } from 'react';

// Hooks
import { useRouteLoading } from '@/hooks/useRouteLoading';
import { useBlockRender } from './hooks/useBlockRender';

// Types
import type { ViewProps } from './QuestionForm.types';

// Components
import Button, { VARIANTS } from '@/components/atoms/Button';
import LoadingIcon from '@/components/atoms/LoadingIcon';
import RightArrow from '@/components/atoms/RightArrow';

type TranslationParams = {
  tCommon: (t: string) => string,
  tQuestion: (t: string) => string,
};

const getNextButtonContent = ({ tCommon, tQuestion }: TranslationParams, { last, loading }: { last: boolean, loading: boolean }) => {
  const buttonText = last ? tQuestion('finish') : tQuestion('next');

  if (loading) {
    return (<><LoadingIcon />{tCommon('loading')}</>);
  }

  return (
    <>
      {buttonText}
      {!last && <RightArrow className="ml-2 -mr-1 w-5 h-5" />}
    </>
  );
};

function QuestionFormView(props: ViewProps) {
  const { formik, interactive, goBack, last, formData } = props;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loading = useRouteLoading();
  const tCommon = useTranslations('Common');
  const tQuestion = useTranslations('Question');

  const component = useBlockRender(formik, { formData });
  const disabled = interactive && (loading || !formik.isValid || !formik.dirty);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col space-y-8 mb-8">{component}</div>

      {/* Action Buttons */}
      {
        isClient && (
          <div className="flex flex-col mb-8 lg:mb-16 justify-center space-y-4 sm:flex-row sm:space-y-1 sm:space-x-4">
            <Button
              type="button"
              variant={VARIANTS.alternative}
              onClick={goBack}
            >
              {tQuestion('back')}
            </Button>
            <Button
              type="submit"
              disabled={disabled}
              variant={VARIANTS.default}
            >
              {getNextButtonContent({ tCommon, tQuestion }, { last, loading })}
            </Button>
          </div>
        )
      }
    </form>
  );
}

export default memo(QuestionFormView);
