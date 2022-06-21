import { useState, useEffect } from "react";

export const Bar = (props) => {
  return (
    <div className="bar" style={{ height: 10 * props.height + "px" }}></div>
  );
};
