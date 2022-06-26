import React, { useEffect, useState } from "react";
import { GridCell } from "./GridCell";
import axios from "axios";
const PORT = 5000;
const website =
  process.env.NODE_ENV === "production"
    ? "https://pathfinder-and-sorting-react.herokuapp.com"
    : `http://localhost:${PORT}`;

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
      .post(`${website}/build-graph`, {
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
      .post(`${website}/${algo}`, {
        tempCells,
        src,
        des,
      })
      .then(async (res) => {
        let path = res.data;
        path.push(des);
        console.log("path found");
        for (let p of path) {
          setVisited((prev) => [...prev, p]);
          await delay(50);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetVisited = () => {
    setVisited([]);
  };

  function delay(delayInms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }

  const displayCells = gridCells.map((row, rowIndex) => {
    return gridCells[rowIndex].map((col, colIndex) => {
      return (
        <GridCell
          key={`${rowIndex}${colIndex}`}
          row={rowIndex}
          col={colIndex}
          visited={visited}
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
      <select
        onChange={handleChange}
        defaultValue={algo}
        className="pathSelectTool"
      >
        <option value="bfs">BFS</option>
        <option value="dfs">DFS</option>
        <option value="shortest_path">Shortest Path</option>
      </select>
      <div className="mainGrid">{displayCells}</div>
    </div>
  );
};
