"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

import CategoryBox from "./CategoryBox";

import "./Categories.scss";
import { categories } from "@/app/data/categories";

const Categories = () => {
  const pathname = usePathname();
  const params = useSearchParams();

  const currentCategory = params?.get("category");

  if (pathname !== "/") return null;

  return (
    <nav className="categories" aria-label="Categories navigation">
      <ul className="categories__list">
        {categories.map((category) => (
          <li key={category.label}>
            <CategoryBox
              category={category.label}
              description={category.description}
              icon={category.icon}
              selected={
                currentCategory == category.label.toLowerCase() ? true : false
              }
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Categories;
