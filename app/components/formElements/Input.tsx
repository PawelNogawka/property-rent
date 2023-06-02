"use client";

import React, { useState, ChangeEvent } from "react";

import "./Input.scss";

interface InputProps {
  type: string;
  name: string;
  id: string;
  label?: string;
  placeholder: string;
  ariaLabel: string;
  value: string | number;
  error?: string | null;
  required?: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  id,
  label,
  placeholder,
  ariaLabel,
  value,
  onChange,
  error,
  required,
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFocused(true);
  };

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFocused(false);
  };

  return (
    <div className="input">
      {label && (
        <label htmlFor={id} className="input__label">
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={!focused && error ? error : placeholder}
          aria-label={ariaLabel}
          className={
            !focused && error
              ? "input__input input__input--error"
              : "input__input"
          }
          value={error !== null && !focused ? error : value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          spellCheck={error ? false : true}
        />
      ) : (
        <input
          type={error ? "text" : type}
          id={id}
          name={name}
          aria-label={ariaLabel}
          value={error !== null && !focused ? error : value}
          onChange={onChange}
          placeholder={!focused && error ? error : placeholder}
          className={
            !focused && error
              ? "input__input input__input--error"
              : "input__input"
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required ? true : false}
        />
      )}
    </div>
  );
};

export default Input;
