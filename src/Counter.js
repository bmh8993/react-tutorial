import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      //return state;
      throw new Error("Unhandled action");
  }
}

function Counter() {
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({
      type: "INCREMENT",
    });
  };
  const onDecrease = () => {
    dispatch({
      type: "DECREMENT",
    });
  };
  // const [number, setNumber] = useState(0);
  // const onIncrease = () => {
  //   setNumber(number + 1); // 업데이트 하고 싶은 값을 넣었다.
  //   //setNumber((prevNumber) => prevNumber + 1); // 함수형 업데이트, 최적화할 때 이렇게해야 한다. 왜냐하면 위의 경우는 number의 상태를 참고하기 때문에 최적화를 할 수 없다.
  // };

  // const onDecrease = () => {
  //   setNumber(number - 1);
  //   // setNumber((prevNumber) => prevNumber - 1);
  // };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
