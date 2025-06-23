import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/counter/counterSlice";

const Test = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex flex-col items-center mt-10 space-y-4">
        <h1 className="text-3xl font-bold">Counter: {count}</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => dispatch(decrement())}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            -
          </button>
          <button
            onClick={() => dispatch(increment(1))}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;
