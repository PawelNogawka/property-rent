import React, { ReactNode } from "react";

import "./Wrapper.scss";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

export default Wrapper;
