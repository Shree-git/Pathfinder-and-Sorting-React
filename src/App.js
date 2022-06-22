import "./App.css";
import { Board } from "./components/Board";
import { Calc } from "./components/calculator/Calc";
import { Sort } from "./components/sorting/Sort";

function App() {
  return (
    <div className="App">
      <Board></Board>
      <Sort></Sort>
      <Calc></Calc>
    </div>
  );
}

export default App;
