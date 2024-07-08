// Modules
import * as yup from 'yup';

// Constants
import { INTERACTIVE_TYPES } from '@/constants/block';

export function getValidationSchema(blocks: BlocksList) {
  const schema: yup.ObjectShape = {};

  for (const block of blocks) {
    if (!INTERACTIVE_TYPES?.[block.type]) continue;
    const { name } = block as InteractionBlock;
    schema[name] = yup.mixed().required();
  }

  return yup.object().shape(schema);
}
