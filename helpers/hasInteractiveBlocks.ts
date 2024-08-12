// Constants
import { INTERACTIVE_TYPES } from '@/constants/block';

export function hasInteractiveBlocks(formData: BlocksList) {
  return formData.some(({ type }) => INTERACTIVE_TYPES[type]);
}
