import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  onSelect: (value: string) => void;
  label?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({ options, onSelect, label, className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(options[0]?.value || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
    onSelect(value);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative bg-transparent items-start gap-2 mt-3 ${className}`}
    >
      {label && (
            <label className="text-sm leading-[21px] font-medium text-white">
          {label}
        </label>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-transparent border border-[#494949] text-sm leading-[21px] font-medium focus:outline-none rounded-lg py-3 px-4 text-white w-full flex justify-between"
      >
        {selectedOption}
        <span className={`ml-2 transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
          <IoIosArrowDown />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full bg-[#2d2d2d] rounded-lg mt-1 text-accent top-[24px]  border-t-0 border border-[#494949] ">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)} 
              className="px-4 py-2 hover:bg-[#212121] cursor-pointer rounded-lg"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;