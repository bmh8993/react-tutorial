import React from "react";

function Hello({ color, name, isSpecial }) {
  return (
    <div
      style={{
        color,
      }}
    >
      {isSpecial ? <b>*</b> : null} // 선택사항이 존재 할 때 3항 연산자 //{" "}
      {isSpecial && <b>*</b>} 보여주고 숨기고 && 안녕하세요 {name}
    </div>
  );
}

Hello.defaultProps = {
  name: "이름없음",
};
export default Hello;
