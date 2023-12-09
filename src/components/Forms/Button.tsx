type TButton = {
  type: "button" | "submit" | "reset" | undefined;
  children: string;
  disabled?: boolean;
};

export const Button = ({ children, type, disabled }: TButton) => {
  return (
    <div>
      <button
        type={type}
        className={`text-1rem ${
          disabled ? "opacity-50 cursor-wait" : "cursor-pointer"
        } bg-yellow-500 text-yellow-800 min-w-8rem p-2.5 rounded-md transition duration-100 focus:outline-none focus:shadow-outline-yellow hover:shadow-outline-yellow`}
      >
        {children}
      </button>
    </div>
  );
};
