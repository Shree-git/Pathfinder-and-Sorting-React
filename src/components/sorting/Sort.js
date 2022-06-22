import { useState, useEffect } from "react";
import { Bars } from "./Bars";

export const Sort = () => {
  return (
    <div className="sort">
      <Bars count={30}></Bars>
    </div>
  );
};
