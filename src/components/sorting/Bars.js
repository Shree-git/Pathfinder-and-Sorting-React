import { useState, useEffect } from "react";
import { Bar } from "./Bar";

export const Bars = ({ count }) => {
  const [bars, setBars] = useState(new Array(count));
  const [sortAlgo, setSortAlgo] = useState("bubble");

  function handleSelect(event) {
    setSortAlgo(event.target.value);
  }

  useEffect(() => {
    reset();
  }, []);

  const barsEl = bars.map((val, idx) => {
    return <Bar key={idx} height={val}></Bar>;
  });

  function sort() {
    switch (sortAlgo) {
      case "bubble":
        bubbleSort([...bars]);
        break;
      case "insertion":
        insertionSort([...bars]);
        break;
      case "merge":
        mergeSort([...bars]);
        break;
      case "quick":
        iterativeQuickSort([...bars]);
        break;
    }
  }

  async function bubbleSort(arr) {
    let isSwapped = false;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          isSwapped = true;

          setBars([...arr]);
          await delay(25);
        }
      }
      if (!isSwapped) {
        break;
      }
    }
  }

  async function insertionSort(arr) {
    let i = 1;
    let j;
    while (i < arr.length) {
      j = i;
      while (j >= 0 && arr[j - 1] > arr[j]) {
        let temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
        j = j - 1;

        setBars([...arr]);
        await delay(100);
      }
      i += 1;
    }
  }

  const swap = (arr, left, right) => {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
  };

  const partitionHigh = async (arr, low, high) => {
    //Pick the first element as pivot
    let pivot = arr[high];
    let i = low;

    //Partition the array into two parts using the pivot
    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        swap(arr, i, j);
        i++;

        setBars([...arr]);
        await delay(100);
      }
    }

    swap(arr, i, high);
    setBars([...arr]);
    await delay(100);
    //Return the pivot index
    return i;
  };

  const iterativeQuickSort = async (arr) => {
    //Stack for storing start and end index
    let stack = [];

    //Get the start and end index
    let start = 0;
    let end = arr.length - 1;

    //Push start and end index in the stack
    stack.push({ x: start, y: end });

    //Iterate the stack
    while (stack.length) {
      //Get the start and end from the stack
      const { x, y } = stack.shift();

      //Partition the array along the pivot
      const PI = await partitionHigh(arr, x, y);
      setBars([...arr]);
      await delay(100);
      //Push sub array with less elements than pivot into the stack
      if (PI - 1 > x) {
        stack.push({ x: x, y: PI - 1 });
      }

      //Push sub array with greater elements than pivot into the stack
      if (PI + 1 < y) {
        stack.push({ x: PI + 1, y: y });
      }
    }
  };

  const mergeSort = async (arr) => {
    //Create two arrays for sorting
    let sorted = Array.from(arr);
    let n = sorted.length;
    let buffer = new Array(n);

    for (let size = 1; size < n; size *= 2) {
      for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
        //Get the two sub arrays
        let left = leftStart,
          right = Math.min(left + size, n),
          leftLimit = right,
          rightLimit = Math.min(right + size, n);

        //Merge the sub arrays
        merge(left, right, leftLimit, rightLimit, sorted, buffer);
      }

      //Swap the sorted sub array and merge them
      let temp = sorted;
      sorted = buffer;
      buffer = temp;
      setBars([...sorted]);
      await delay(1000);
    }

    setBars([...sorted]);
    await delay(1000);

    return sorted;
  };

  const merge = async (left, right, leftLimit, rightLimit, sorted, buffer) => {
    let i = left;

    //Compare the two sub arrays and merge them in the sorted order
    while (left < leftLimit && right < rightLimit) {
      if (sorted[left] <= sorted[right]) {
        buffer[i++] = sorted[left++];
      } else {
        buffer[i++] = sorted[right++];
      }
    }

    //If there are elements in the left sub arrray then add it to the result
    while (left < leftLimit) {
      buffer[i++] = sorted[left++];
    }

    //If there are elements in the right sub array then add it to the result
    while (right < rightLimit) {
      buffer[i++] = sorted[right++];
    }
  };

  function delay(delayTime) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayTime);
    });
  }

  function reset() {
    let tempBars = new Array(count);
    for (let i = 0; i < count; i++) {
      tempBars[i] = Math.ceil(Math.random() * 50);
    }
    setBars(tempBars);
  }

  return (
    <div>
      <div className="bars">{barsEl}</div>
      <button onClick={sort}>Sort</button>
      <button onClick={reset}>Reset</button>
      <select onChange={handleSelect}>
        <option value="bubble">Bubble Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="quick">Quick Sort</option>
      </select>
    </div>
  );
};
