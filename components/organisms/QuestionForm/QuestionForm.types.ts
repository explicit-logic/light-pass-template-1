import type { UseFormRegister } from 'react-hook-form';
import type { ObjectSchema } from 'yup';

export type Values = { [key: string]: string | string[] };

export type ContainerProps = {
  formData: BlocksList;
  interactive: boolean;
};

export type ViewProps = {
  formData: BlocksList;
  interactive: boolean;
  goBack: () => void;
  last: boolean;
  onSubmit: (data: Values) => void;
  validationSchema: ObjectSchema<Values>;
};

export type OnSubmit = (data: Values) => void;

export type Register = UseFormRegister<Values>;
