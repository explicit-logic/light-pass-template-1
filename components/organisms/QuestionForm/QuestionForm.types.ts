import type { FormikContextType, FormikConfig } from 'formik';

export type Values = Record<string, string | string[]>;

export type Formik = FormikContextType<Values>;

export type ContainerProps = {
  formData: BlocksList;
  interactive: boolean;
};

export type ViewProps = {
  formik: Formik;
  interactive: boolean;
  goBack: () => void;
  last: boolean;
  formData: BlocksList;
};

export type OnSubmit = FormikConfig<Values>['onSubmit'];
