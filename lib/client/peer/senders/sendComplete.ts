// Constants
import { TYPES } from '@/constants/message';

// Helpers
import { type Params, send } from '../send';

export async function sendComplete(params: Params, data: Messages.Complete['data']) {
  await send(TYPES.complete, params, data);
}
