// Types
import type { Register } from '../QuestionForm.types';

export type Props = {
  register: Register;
  block: Blocks.RadioGroup;
};

export default function MultipleChoice(props: Props) {
  const { register, block } = props;
  const { name, label, values } = block;

  return (
    <div className="space-y-4">
      <label className="block text-md font-medium text-gray-900 dark:text-white">{label}</label>
      <fieldset className="space-y-4">
        {values.map((option, index) => {
          const id = name.concat('-', (index + 1).toString());
          const value = index + 1;

          return (
            <div key={id} className="flex items-center mb-4">
              <input
                {...register(name)}
                id={id}
                type="radio"
                value={value}
                className="bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 focus:ring-blue-500 h-4 text-blue-600 w-4"
              />
              <label htmlFor={id} className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {option.label}
              </label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}
