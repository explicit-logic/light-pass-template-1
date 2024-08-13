// Constants
import { TYPES } from '@/constants/message';

// Helpers
import { type Params, send } from '../send';

export async function sendProgress(params: Params, data: Messages.Progress['data']) {
  await send(TYPES.progress, params, data);
}
