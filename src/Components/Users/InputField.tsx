import React, { useState, useId, ChangeEvent, FormEvent } from "react";
import Button from "../UI/Button/Button";
import ErrorModal from "../UI/ErrorModal";
import Card from "../UI/Card";

interface InputFieldProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  type?: "text" | "number" | "password" | "email";
  required?: boolean;
  clearable?: boolean;
  onSubmit?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const InputField: React.FC<InputFieldProps> = ({
  value = "",
  onChange,
  label,
  placeholder,
  type = "text",
  required = false,
  clearable = false,
  onSubmit,
  className = "",
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState<{ title: string; message: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();
  const inputId = label ? `${id}-input` : id;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setInputValue("");
    const syntheticEvent = { target: { value: "" } } as unknown as ChangeEvent<HTMLInputElement>;
    onChange?.(syntheticEvent);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (required && inputValue.trim().length === 0) {
      setError({ title: "Empty Input", message: "This field cannot be empty." });
      return;
    }
    onSubmit?.(inputValue);
  };

  return (
    <div className={`w-full ${className}`}>
      {error && <ErrorModal title={error.title} message={error.message} onConfirmError={() => setError(null)} />}
      <Card className="p-4 w-full">
        <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-3">
          {label && <label htmlFor={inputId} className="block font-bold mb-1">{label}</label>}

          <div className="relative">
            <div className="w-full flex justify-center">
              <input
                id={inputId}
                type={type === "password" && showPassword ? "text" : type}
                value={inputValue}
                onChange={handleChange}
                placeholder={placeholder}
                className="
                  w-full max-w-md      /* Full width but max 28rem */
                  px-4 py-2
                  text-gray-900 placeholder-gray-600
                  rounded-xl
                  border-2 border-transparent
                  bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300
                  shadow-lg
                  focus:outline-none
                  focus:ring-4 focus:ring-pink-400 focus:border-transparent
                  transition-all duration-300
                "
              />
            </div>
            {clearable && inputValue && (
              <Button
                type="button"
                className="absolute right-2 top-2 text-gray-600"
                onClick={handleClear}
              >
                ✕
              </Button>
            )}

            {type === "password" && (
              <Button
                type="button"
                className="absolute right-10 top-2 text-gray-600"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? "🙈" : "👁️"}
              </Button>
            )}
          </div>

          {onSubmit && (
            <Button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white w-full py-2 rounded-md">
              Submit
            </Button>
          )}
        </form>
      </Card>
    </div>
  );
};

export default InputField;
