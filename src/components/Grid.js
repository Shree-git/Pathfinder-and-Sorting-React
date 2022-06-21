import React, { useEffect, useState } from "react";
import { GridCell } from "./GridCell";
import axios from "axios";
const PORT = 3005;

export const Grid = ({ row, col }) => {
  const [algo, setAlgo] = useState("shortest_path");
  const [visited, setVisited] = useState([]);
  const [src, setSrc] = useState(null);
  const [des, setDes] = useState(null);
  const [gridCells, setGridCells] = useState([]);
  const [tempCells, setTempCells] = useState({});

  useEffect(() => {
    setGridCells(Array.from(Array(row), () => new Array(col).fill(0)));

    axios
      .post(`http://localhost:${PORT}/build-graph`, {
        row,
        col,
      })
      .then((res) => {
        setTempCells(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (src != null && des != null) {
      pathfind(src, des);
    }
  }, [des]);

  const onCellClicked = async (row, col) => {
    if (src == null && des === null) {
      setSrc(`${row}${col}`);
      console.log("1");
    } else if (src != null && des === null) {
      setDes(`${row}${col}`);
      console.log("2");
      console.log("desss", des);
      // await pathfind(src, des);
    } else if (src != null && des != null) {
      setSrc(`${row}${col}`);
      setDes(null);
      console.log("3");
      resetVisited();
    }
    console.log("src", src);
    console.log("des", des);
  };

  const pathfind = () => {
    console.log("finding path...");
    return axios
      .post(`http://localhost:${PORT}/${algo}`, {
        tempCells,
        src,
        des,
      })
      .then((res) => {
        let path = res.data;
        path.push(des);
        console.log("path found");
        setVisited(path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetVisited = () => {
    setVisited([]);
  };

  const displayCells = gridCells.map((row, rowIndex) => {
    return gridCells[rowIndex].map((col, colIndex) => {
      return (
        <GridCell
          key={`${rowIndex}${colIndex}`}
          row={rowIndex}
          col={colIndex}
          visited={visited}
          resetVisited={resetVisited}
          onClick={onCellClicked}
        ></GridCell>
      );
    });
  });

  function handleChange(event) {
    setAlgo(event.target.value);
    resetVisited();
  }

  return (
    <div>
      <div className="mainGrid">{displayCells}</div>
      <select onChange={handleChange} defaultValue={algo}>
        <option value="bfs">BFS</option>
        <option value="dfs">DFS</option>
        <option value="shortest_path">Shortest Path</option>
      </select>
    </div>
  );
};
