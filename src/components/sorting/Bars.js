import { useState, useEffect } from "react";
import { Bar } from "./Bar";

export const Bars = ({ count }) => {
  const [bars, setBars] = useState(new Array(count));

  useEffect(() => {
    let tempBars = new Array(count);
    for (let i = 0; i < count; i++) {
      tempBars[i] = Math.ceil(Math.random() * 50);
    }
    setBars(tempBars);
  }, []);

  const barsEl = bars.map((val, idx) => {
    return <Bar key={idx} height={val}></Bar>;
  });

  function sort() {
    // setBars((prev) => [
    //   ...prev.sort(function (a, b) {
    //     return a - b;
    //   }),

    // ]);

    bubbleSort([...bars]);
    // setBars((prev) => bubbleSort([...prev]));
  }

  async function bubbleSort(arr) {
    var i, j;
    var len = arr.length;

    var isSwapped = false;

    for (i = 0; i < len; i++) {
      isSwapped = false;

      for (j = 0; j < len; j++) {
        if (arr[j] > arr[j + 1]) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          isSwapped = true;
        }
        setBars([...arr]);
        await delay(25);
      }

      // IF no two elements were swapped by inner loop, then break
      if (!isSwapped) {
        break;
      }
    }
    // return arr;
  }

  function delay(delayTime) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayTime);
    });
  }

  return (
    <div>
      <div className="bars">{barsEl}</div>
      <button onClick={sort}>Sort</button>
    </div>
  );
};
