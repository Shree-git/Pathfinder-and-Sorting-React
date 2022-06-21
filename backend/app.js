const express = require("express");
const app = express();
const cors = require("cors");
const { type } = require("@testing-library/user-event/dist/type");
const PORT = 3005;

app.use(cors());
app.use(express.json());

app.post("/bfs", (req, res) => {
  const { tempCells, src, des } = req.body;
  console.log(src, des);
  res.send(bfs(tempCells, src, des));
});

app.post("/dfs", (req, res) => {
  const { tempCells, src, des } = req.body;
  console.log(src, des);
  res.send(dfs(tempCells, src, des));
});

app.post("/build-graph", (req, res) => {
  const { row, col } = req.body;

  const tempCells = {};
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      tempCells[`${i}${j}`] = { neighbors: [] };
    }
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (i - 1 >= 0) {
        tempCells[`${i}${j}`]["neighbors"].push(`${i - 1}${j}`);
      }
      if (i + 1 < row) {
        tempCells[`${i}${j}`]["neighbors"].push(`${i + 1}${j}`);
      }
      if (j - 1 >= 0) {
        tempCells[`${i}${j}`]["neighbors"].push(`${i}${j - 1}`);
      }
      if (j + 1 < col) {
        tempCells[`${i}${j}`]["neighbors"].push(`${i}${j + 1}`);
      }
    }
  }
  res.send(tempCells);
});

function bfs(graph, src, destination) {
  let queue = [src];
  let visited = [];
  // console.log(graph);
  while (queue) {
    let poppedEl = queue.shift();
    if (!visited.includes(poppedEl)) {
      if (poppedEl === destination) {
        return visited;
      }
      visited.push(poppedEl);
      console.log(poppedEl, graph[poppedEl]["neighbors"]);
      queue.push(...graph[poppedEl]["neighbors"]);
    }
  }
  return [];
}

function dfs(graph, src, des, visited = []) {
  if (src === des) {
    return visited;
  }
  if (visited.includes(src)) {
    return [];
  }
  visited.push(src);

  for (let neighbor of graph[src]["neighbors"]) {
    if (dfs(graph, neighbor, des, visited).length > 0) {
      return visited;
    }
  }
  return [];
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
