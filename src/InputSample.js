import React, { useState } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });
  const { name, nickname } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.name);
    console.log(e.target.value);

    const nextInputs = {
      //객체를 업데이트 시키는 방법
      ...inputs,
      [name]: value, //name의 값에 따라 다른 key를 가리키게 된다
    };
    setInputs(nextInputs);
  };
  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
  };
  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name}: ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
