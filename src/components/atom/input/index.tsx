import React from "react";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value?: string | number;
  type?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  className?:React.ReactNode
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  value,className,
  onChange,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm leading-[21px] font-medium text-white">
        {label}{" "}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className="bg-transparent border border-[#494949] text-sm leading-[21px] font-medium focus:outline-none rounded-lg py-3 px-4 text-white"
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default InputField;
