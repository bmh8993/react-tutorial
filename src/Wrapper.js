import React from "react";

function Wrapper({ children }) {
  // 하위 컴포넌트는 children으로 가져올 수 있다.
  const style = {
    bording: "2px solid black",
    padding: 16,
  };
  return <div style={style}>{children}</div>;
}

export default Wrapper;
