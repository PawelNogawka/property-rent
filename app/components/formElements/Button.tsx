import React from "react";
import Link from "next/link";

import "./Button.scss";

interface ButtonProps {
  onClick?: any;
  to?: string;
  outline?: boolean;
  empty?: boolean;
  children: React.ReactNode;
  ariaLabel: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  dark?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  to,
  outline,
  empty,
  children,
  ariaLabel,
  disabled,
  type,
  dark,
}) => {
  if (to) {
    return (
      <Link href={to}>
        <a
          aria-label={ariaLabel}
          className={`${"btn"} ${outline && "btn--outline"} ${
            empty && "btn--empty"
          } `}
        >
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className={`${"btn"} ${outline && "btn--outline"} ${
          dark && "btn--dark"
        } ${empty && "btn--empty"}  ${disabled && "btn--disabled"}`}
        type={type || "button"}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
};

export default Button;
