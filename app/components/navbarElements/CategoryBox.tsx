"use client";

import React from "react";
import { IconType } from "react-icons/lib";
import { useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";

interface CategoryBoxProps {
  category: string;
  description: string;
  selected?: boolean;
  icon: IconType;
}

import "./CategoryBox.scss";

const CategoryBox: React.FC<CategoryBoxProps> = ({
  category,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: category.toLowerCase(),
    };

    if (params?.get("category") == category) {
      delete updatedQuery.category;
    }

    if (params?.get("search")) {
      delete updatedQuery.search;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={handleClick}
      className={`category ${selected && "category--selected"}`}
      aria-label={`Go to ${category} category`}
    >
      <Icon size={26} />
      <span className="category__name">{category}</span>
    </button>
  );
};

export default CategoryBox;
