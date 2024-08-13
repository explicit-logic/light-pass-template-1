// Constants
import { TYPES } from '@/constants/message';

// Helpers
import { type Params, send } from '../send';

export async function sendMessage(params: Params, data: Messages.Message['data']) {
  await send(TYPES.message, params, data);
}
