// Constants
import type { TYPES } from '@/constants/message';

// Store
import { getReceiver, getClientId } from './store';

export type Params = {
  quizId: number;
  language: string;
};
export async function send(type: keyof typeof TYPES, params: Params, data: Message['data']) {
  const clientId = getClientId();
  const receiver = getReceiver();

  if (!receiver) {
    console.error('Receiver is not set');
    return;
  }

  if (!clientId) {
    console.error('Client id is not set');
    return;
  }

  await receiver.send({
    ...params,
    clientId,
    type,
    data,
  });
}
