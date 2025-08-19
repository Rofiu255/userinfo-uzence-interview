import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", type = "button", ...props }) => {
  return (
    <button
      type={type}
      {...props}
      className={`
        px-5 py-2 rounded-lg font-semibold
        text-white
        bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
        hover:scale-105 hover:shadow-xl
        transition-transform duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
