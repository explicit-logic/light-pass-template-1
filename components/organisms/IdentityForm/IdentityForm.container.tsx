'use client';
// Modules
import { useEffect } from 'react';

// Lib
import { setIdentity } from '@/store/identityStorage';
import { setSlugs } from '@/store/slugStorage';
import { toast } from '@/lib/client/toaster';

// Config
import { getQuizConfig } from '@/lib/client/getQuizConfig';

// Components
import IdentityFormView from './IdentityForm.view';

// Constants
// import { FIELDS } from './constants';
import { STATES } from '@/constants/connection';

// Helpers
import { getOrderHandler } from '@/helpers/getOrderHandler';
import { getInitialValues } from './helpers/getInitialValues';
import { getValidationSchema } from './helpers/getValidationSchema';
import { getEnabled as getCountdownEnabled, getTimeLimit, establishEndTime } from '@/lib/client/countdown/helpers';

// Hooks
import { useConnection } from '@/hooks/useConnection';
import { useParams, useRouter } from 'next/navigation';

// Senders
import { sendIdentity } from '@/lib/client/peer/senders/sendIdentity';

// Store
import { setStartTime } from '@/store/stopwatchStorage';

// Types
import type { ContainerProps, Values } from './IdentityForm.types';

const config = getQuizConfig();
const orderHandler = getOrderHandler(config.order);

function IdentityFormContainer(props: ContainerProps) {
  const { slugs } = props;

  const { state } = useConnection();

  const { locale } = useParams<{ locale: string }>();

  const initialValues = getInitialValues(config.fields);
  const validationSchema = getValidationSchema(config.fields);

  const router = useRouter();

  useEffect(() => {
    const finished = sessionStorage.getItem('finished');

    if (finished) {
      router.replace(`/${locale}/result`);
    }
  }, [locale, router]);

  async function onSubmit(values: Values) {
    try {
      if (!slugs.length) return;

      setIdentity(values);

      const orderedSlugs = orderHandler(slugs);
      setSlugs(orderedSlugs);
      const [slug] = orderedSlugs;

      if (state === STATES.ONLINE) {
        const email = values.email ?? '';
        await sendIdentity(
          {
            quizId: config.quizId,
            language: locale,
          },
          {
            email,
            group: values.group,
            name: values.name,
            context: {
              slugs: orderedSlugs,
            }
          }
        );
      }

      setStartTime(new Date().valueOf());

      const countdownEnabled = getCountdownEnabled();
      if (countdownEnabled) {
        const timeLimit = getTimeLimit();
        establishEndTime(timeLimit.duration);
      }

      router.replace(`/${locale}/questions/${slug}`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <IdentityFormView
      initialValues={initialValues}
      fields={config.fields}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    />
  );
}

export default IdentityFormContainer;
