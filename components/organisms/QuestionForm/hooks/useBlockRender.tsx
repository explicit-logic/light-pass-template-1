/* eslint-disable @next/next/no-img-element */

// Components
import BlockImage from '../blockComponents/BlockImage';
import MultipleResponse from '../questionComponents/MultipleResponse';
import MultipleChoice from '../questionComponents/MultipleChoice';

// Constants
import { TYPES } from '@/constants/block';

// Types
import type { Formik } from '../QuestionForm.types';

export function useBlockRender(formik: Formik, { formData }: { formData: BlocksList }) {

  return formData.map((block, idx) => {

    if (block.type === TYPES.HEADER) {
      return <h1 key={idx} className="text-3xl font-extrabold dark:text-white">{block.label}</h1>;
    }

    if (block.type === TYPES.IMAGE) {
      return <BlockImage key={idx} block={block} />;
    }

    if (block.type === TYPES.RADIO_GROUP) {
      return <MultipleChoice key={idx} formik={formik} block={block} />;
    }

    if (block.type === TYPES.CHECKBOX_GROUP) {
      return <MultipleResponse key={idx} formik={formik} block={block} />;
    }
  });
}
