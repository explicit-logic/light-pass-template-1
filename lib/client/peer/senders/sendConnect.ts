// Constants
import { TYPES } from '@/constants/message';

// Helpers
import { detectPlatform } from '@/helpers/detectPlatform';
import { identifyThemeMode } from '@/helpers/identifyThemeMode';

// Store
import { getReceiver } from '../store';

export async function sendConnect({ clientId, language, pathname, quizId }: { clientId?: string, language: string, pathname: string, quizId: number }) {
  const receiver = getReceiver();

  if (!receiver) {
    console.error('Receiver is not set');
    return;
  }

  await receiver.send({
    type: TYPES.connect,
    quizId,
    language,
    data: {
      userAgent: navigator.userAgent,
      clientId,
      platform: detectPlatform(),
      pathname,
      theme: identifyThemeMode(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  } as Messages.Connect);
}
