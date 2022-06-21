import "./App.css";
import { Board } from "./components/Board";
import { Calc } from "./components/calculator/Calc";
import { Sort } from "./components/sorting/Sort";

function App() {
  return (
    <div className="App">
      <Sort></Sort>
      <Calc></Calc>
      <Board></Board>
    </div>
  );
}

export default App;
