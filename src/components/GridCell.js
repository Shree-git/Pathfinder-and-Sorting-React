import React, { useState, useEffect } from "react";

export const GridCell = ({ row, col, visited, resetVisited, onClick }) => {
  const [className, setClassName] = useState("gridCell");
  const [isClicked, setIsClicked] = useState(false);

  const onCellClicked = () => {
    onClick(row, col);
    setIsClicked((prev) => true);
  };

  useEffect(() => {
    if (visited.includes(`${row}${col}`)) {
      setClassName((prev) => prev + " visitedCell");
      setIsClicked(false);
    } else {
      setClassName("gridCell");
    }
  }, [visited]);

  return (
    <div
      className={className}
      style={isClicked ? { backgroundColor: "aquamarine" } : null}
      draggable
      onClick={onCellClicked}
    >
      {`${row}${col}`}
    </div>
  );
};
