import React from "react";

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormField = ({
  label,
  id,
  type,
  value,
  placeholder,
  onChange,
  required = true,
}: FormFieldProps) => {
  return (
    <div className="w-full mb-4">
      <label
        className="block font-bold text-headingColor mb-2 text-sm"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="border border-borderprimary rounded w-full py-2 px-3 text-primary leading-tight focus:outline-bluegray"
        id={id}
        type={type}
        value={value}
        placeholder={placeholder || label}
        onChange={onChange}
        autoComplete="off"
        required={required}
      />
    </div>
  );
};

export default FormField;
