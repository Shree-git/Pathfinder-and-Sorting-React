import { useState, useEffect } from "react";

export const Calc = () => {
  const numbersEl = new Array(10).fill(0).map((val, index) => {
    return (
      <div
        key={(index + 1) % 10}
        className="gridCell"
        onClick={() => captureNumber(index)}
      >
        {(index + 1) % 10}
      </div>
    );
  });

  const operators = ["+", "-", "/", "*", "^", "%", "="];

  const oprEl = operators.map((val, index) => {
    return (
      <div key={index} className="gridCell" onClick={() => captureOpr(val)}>
        {val}
      </div>
    );
  });

  const [firstNum, setFirstNum] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [isOpr, setIsOpr] = useState(false);
  const [isFirstNum, setIsFirstNum] = useState(true);
  const [opr, setOpr] = useState(null);
  const [result, setResult] = useState("Display");

  useEffect(() => {
    if (result === "") {
      setResult("Display");
    }
  }, [result]);

  useEffect(() => {
    console.log("first", firstNum);
    console.log("second", secondNum);
    console.log("opr", opr);

    if (opr === null || opr === "=") {
      setResult(`${firstNum}`);
    } else {
      setResult(`${firstNum} ${opr} ${secondNum}`);
    }
  }, [firstNum, secondNum, opr]);

  //   useEffect(() => {
  //     console.log(isOpr);
  //     setIsFirstNum(false);
  //   }, [isOpr]);

  function captureNumber(index) {
    if (opr === "=" && isOpr) {
      setFirstNum(index.toString());
      setIsOpr(false);
    } else if (isFirstNum) {
      setFirstNum((prev) => prev + index);
    } else {
      setSecondNum((prev) => prev + index);
    }
  }

  function captureOpr(oprn) {
    if (isFirstNum) {
      setIsOpr(true);
      setIsFirstNum(false);
    } else {
      setFirstNum((prev) => {
        switch (opr) {
          case "+":
            return (parseInt(prev) + parseInt(secondNum)).toString();
          case "-":
            return (parseInt(prev) - parseInt(secondNum)).toString();
          case "/":
            return (parseFloat(prev) / parseInt(secondNum)).toString();
          case "*":
            return (parseInt(prev) * parseInt(secondNum)).toString();
          case "^":
            return Math.pow(parseInt(prev), parseInt(secondNum)).toString();
          case "%":
            return (parseInt(prev) % parseInt(secondNum)).toString();
        }
      });
      setSecondNum("");
      if (oprn === "=") {
        setIsFirstNum(true);
      }
    }
    setOpr(oprn);
  }

  function clearCalc() {
    setFirstNum("");
    setSecondNum("");
    setIsOpr(false);
    setIsFirstNum(true);
    setOpr(null);
  }

  return (
    <div className="calculator">
      <div className="display">{result}</div>
      <div className="calcBoard">
        {numbersEl}
        {oprEl}
        <div className="gridCell" onClick={clearCalc}>
          A/C
        </div>
      </div>
    </div>
  );
};
