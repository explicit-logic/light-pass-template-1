// Types
import type { Formik } from '../QuestionForm.types';

export type Props = {
  formik: Formik;
  block: Blocks.CheckboxGroup;
};

export default function MultipleResponse(props: Props) {
  const { formik, block } = props;
  const { name, label, values } = block;

  return (
    <div className="space-y-4">
      <label className="block text-md font-medium text-gray-900 dark:text-white">{label}</label>
      <fieldset className="space-y-4">
        {values.map((option, index) => {
          const id = name.concat('-', (index + 1).toString());
          const value = index + 1;

          return (
            <div key={value} className="flex items-center">
              <input
                id={id}
                type="checkbox"
                name={name}
                onChange={formik.handleChange}
                value={value}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                // checked={formik.values[name] === value}
              />
              <label htmlFor={id} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {option.label}
              </label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}
