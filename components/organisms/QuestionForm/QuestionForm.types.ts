import type { FormikContextType, FormikConfig } from 'formik';

export type Values = Record<string, string | string[]>;

export type Formik = FormikContextType<Values>;

export type ContainerProps = {
  blocks: BlocksList;
};

export type ViewProps = {
  formik: Formik;
  goBack: () => void;
  last: boolean;
  blocks: BlocksList;
};

export type OnSubmit = FormikConfig<Values>['onSubmit'];
