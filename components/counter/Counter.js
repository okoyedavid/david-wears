"use client";
import { useSelector, useDispatch } from "react-redux";

import { increment, decrement } from "./counterSlice";

export default function Counter() {
  const counter = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}
