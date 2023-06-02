import React from "react";
import { Oval } from "react-loader-spinner";

import "./Loader.scss";

interface OvalProps {
  height?: number;
  width?: number;
  color?: string;
  secondaryColor?: string;
  ariaLabel?: string;
  visible?: boolean;
}

interface LoaderProps {
  big?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ big }) => {
  const ovalProps: OvalProps = {
    height: big ? 80 : 50,
    width: big ? 80 : 50,
    color: "#ccc",
    secondaryColor: "#ddd",
    ariaLabel: "triangle-loading",
    visible: true,
  };

  return (
    <div className={`loading-spinner ${big ? "loading-spinner--big" : ""}`}>
      <Oval {...ovalProps} />
    </div>
  );
};

export default Loader;
