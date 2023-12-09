type TInput = {
  label: string;
  type: string;
  placeholder?: string;
  name: string;
  error?: string;
};

export const Input = ({ label, type, placeholder, name, error }: TInput) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="border border-gray-300 rounded w-full py-2 px-3 mt-1 text-sm focus:outline-none focus:border-yellow-500 transition duration-200"
      />
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </div>
  );
};
