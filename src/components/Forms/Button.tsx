import React from "react";

type TButton = {
  type: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
};

export const Button = ({ children, type, disabled, loading }: TButton) => {
  return (
    <div>
      <button
        type={type}
        className={`text-1rem ${
          disabled || loading ? "opacity-50 cursor-wait" : "cursor-pointer"
        } bg-yellow-500 text-yellow-800 min-w-8rem p-2.5 rounded-md transition duration-100 focus:outline-none focus:shadow-outline-yellow hover:shadow-outline-yellow ${
          loading ? "relative" : ""
        }`}
        disabled={disabled || loading}
      >
        {loading ? (
          <>
            <span className="mr-2">Carregando...</span>
            <div className="loader inline-block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </>
        ) : (
          children
        )}
      </button>
    </div>
  );
};
