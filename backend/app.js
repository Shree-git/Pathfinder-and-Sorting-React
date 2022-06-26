const express = require("express");
const app = express();
// const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const PORT = process.env.PORT || 3005;
app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Origin",
    "https://pathfinder-and-sorting-react.netlify.app"
  ); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.use(cors(corsOptions));
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

app.post("/shortest_path", (req, res) => {
  const { tempCells, src, des } = req.body;
  console.log(src, des);
  res.send(shortest_path(tempCells, src, des));
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
      if (i - 1 >= 0 && j - 1 >= 0) {
        tempCells[`${i}${j}`]["neighbors"].push(`${i - 1}${j - 1}`);
      }
      if (i - 1 >= 0 && j + 1 < col) {
        tempCells[`${i}${j}`]["neighbors"].push(`${i - 1}${j + 1}`);
      }
      if (i + 1 < row && j - 1 >= 0) {
        tempCells[`${i}${j}`]["neighbors"].push(`${i + 1}${j - 1}`);
      }
      if (i + 1 < row && j + 1 < col) {
        tempCells[`${i}${j}`]["neighbors"].push(`${i + 1}${j + 1}`);
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

function shortest_path(graph, src, destination) {
  if (src === destination) {
    return [src];
  }
  let N = parseInt(Math.pow(Object.keys(graph).length, 2));
  let pred = {};
  let dist = {};
  let queue = [src];
  let visited = [src];
  dist[src] = 0;
  while (queue) {
    let poppedEl = queue.shift();
    for (let neighbor of graph[poppedEl]["neighbors"]) {
      if (!visited.includes(neighbor)) {
        visited.push(neighbor);
        dist[neighbor] = dist[poppedEl] + 1;
        pred[neighbor] = poppedEl;
        queue.push(neighbor);
        if (neighbor === destination) {
          let path = [];
          crawl = destination;
          path.push(crawl);

          while (pred[crawl] != src) {
            path.push(pred[crawl]);
            crawl = pred[crawl];
          }
          path.push(src);
          return path;
        }
      }
    }
  }
  return [];
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
