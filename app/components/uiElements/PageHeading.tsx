import React from "react";

import './PageHeading.scss'

interface PageHeadingProps {
  title: string;
  subtitle: string;
}


const PageHeading: React.FC<PageHeadingProps> = ({ title, subtitle }) => {
  return (
    <header className="page-heading">
      <h1 className="page-heading__title">{title}</h1>
      <p className="page-heading__subtitle">{subtitle}</p>
    </header>
  );
};

export default PageHeading;
