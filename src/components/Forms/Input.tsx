import React from "react";

/*
Validação e manipulação do formulário: O ref pode ser útil se você precisar realizar validações ou manipulações específicas no campo de entrada a partir de funções ou eventos fora do componente Input.
*/

type TInput = {
  label: string;
  type: string;
  placeholder?: string;
  name: string;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
};

export const Input = React.forwardRef<HTMLInputElement, TInput>(
  ({ label, type, placeholder, name, error, ...rest }, ref) => {
    return (
      <div className="mb-4">
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          {label}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className="border border-gray-300 rounded w-full py-2 px-3 mt-1 text-sm focus:outline-none focus:border-yellow-500 transition duration-200"
          ref={ref}
          {...rest}
        />
        {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
      </div>
    );
  },
);
