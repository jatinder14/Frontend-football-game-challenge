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
  className?:React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ options, onSelect, label,className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("20");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
      className={`relative bg-transparent items-center gap-2 ${className}`}
    >
      {label && (
        <label className="text-accent text-xs leading-[18px] font-normal">
          {label}
        </label>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs w-full px-2 py-1 border border-[#494949] rounded-lg focus:outline-none flex justify-between items-center text-accent"
      >
        {selectedOption}
        <span
          className={`ml-2 transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <IoIosArrowDown />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full bg-[#2d2d2d] rounded-lg  mt-1 text-accent top-[24px]">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.label)}
              className="px-4 py-2 hover:bg-[#212121] cursor-pointer"
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
