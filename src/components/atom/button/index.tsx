import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  label: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', label, onClick }) => {
  const baseStyles = 'py-3 px-5 rounded-lg text-lightWhite focus:outline-none text-sm leading-[21px] font-medium';
  const variantStyles = variant === 'primary'
    ? 'bg-primary'
    : 'bg-secondary'; 

  return (
    <button className={`${baseStyles} ${variantStyles}`} onClick={onClick}>
      {label}
    </button>
  );
};
