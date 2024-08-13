// Constants
import { TYPES } from '@/constants/message';

// Helpers
import { type Params, send } from '../send';

export async function sendIdentity(params: Params, data: Messages.Identity['data']) {
  await send(TYPES.identity, params, data);
}
