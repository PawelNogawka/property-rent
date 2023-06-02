import React from "react";
import { IconType } from "react-icons/lib";

interface CategoryInputProps {
  category: string;
  description: string;
  selected?: boolean;
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

import "./CategoryInput.scss";

const CategoryInput: React.FC<CategoryInputProps> = ({
  category,
  description,
  icon: Icon,
  selected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${"category-input"} ${
        selected && "category-input--selected"
      }`}
      aria-label={`Select ${category} category`}
    >
      <div className="category-input__left">
        <Icon size={26} />
      </div>
      <div className="category-input__right">
        <h3 className="category-input__name">{category}</h3>
        <p className="category-input__desc">{description}</p>
      </div>
    </button>
  );
};

export default CategoryInput;
