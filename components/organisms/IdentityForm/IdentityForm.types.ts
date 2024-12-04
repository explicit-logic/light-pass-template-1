import type { QuizConfig } from '@/types/quiz.types';
import type { ObjectSchema } from 'yup';

export type Values = {
  email?: string;
  group?: string;
  name?: string;
};

export type ContainerProps = {
  slugs: string[];
};

export type OnSubmit = (data: Values) => Promise<void>;

export type ViewProps = {
  defaultValues: Values;
  fields: QuizConfig['fields'];
  validationSchema: ObjectSchema<{ [x: string]: unknown; }>;
  onSubmit: OnSubmit;
};
