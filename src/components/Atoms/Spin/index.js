import React from "react";
import { Spin as SpinAntd } from "antd";

import "./styles.scss";

const Spin = () => {
  return <SpinAntd />;
};

export default Spin;

const loadingWrapper = (className) => () => (
  <div className={className}>
    <Spin />
  </div>
);

export const LoadingScreen = loadingWrapper("loading-screen");
