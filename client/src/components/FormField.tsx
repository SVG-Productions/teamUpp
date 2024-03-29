import React from "react";
import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FormFieldProps {
  label?: string;
  id: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: IconDefinition;
  iconColor?: string;
}

const FormField = ({
  label,
  id,
  type,
  value,
  placeholder,
  onChange,
  required = true,
  icon,
  iconColor,
}: FormFieldProps) => {
  return (
    <div className="w-full mb-4">
      <label
        className="block font-bold text-headingColor mb-2 text-sm"
        htmlFor={id}
      >
        {icon ? (
          <FontAwesomeIcon icon={icon} className={`${iconColor} mr-2`} />
        ) : null}
        <span>{label}</span>
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
