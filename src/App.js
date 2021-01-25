import React, { useRef, useState, useMemo, useCallback } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
  console.log("활성 유저를 세는 중");
  return users.filter((user) => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });

  const { username, email } = inputs;
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );
  // useCallback을 사용함으로 inputs가 변경되었을 때에만 새롭게 만들어내고, 평소에는 재사용한다.
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "velopert2",
      email: "public.velopert2@gmail.com",
      active: false,
    },
    {
      id: 3,
      username: "velopert3",
      email: "public.velopert3@gmail.com",
      active: false,
    },
  ]);

  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers(users.concat(user));
    // setUsers([...users, user]); 위와 동일
    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  }, [email, username, users]);

  const onRemove = useCallback(
    (id) => {
      setUsers(users.filter((user) => user.id !== id));
    },
    [users]
  );

  const onToggle = useCallback(
    (id) => {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    },
    [users]
  );
  const count = useMemo(() => countActiveUsers(users), [users]);
  // users가 바뀔 때에만 호출이 되고, 그런게 아니면 이전 값을 그대로 사용한다.
  // 컴포넌트성능 최적화
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />;
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App;

// App컴포넌트가 rerender 될 때마다 컴포넌트 안의 함수도 새로 만들어지고 있다.
// 함수를 새로 만드는 일은 리소스를 많이 차지하는 작업은 아니다. 하지만 한 번 만든 함수를 재사용하는 것은 옳다.
// props가 바뀌지 않았다면 rerender를 안하도록 할 수 있다. 그 사전 작업으로 함수도 rerender가 안되고 재사용 하도록
// 만들어야한다.
