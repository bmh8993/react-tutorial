import React, { useRef, useReducer, useMemo, useCallback } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import useInputs from "./useInputs";

function countActiveUsers(users) {
  console.log("활성 유저를 세는 중");
  return users.filter((user) => user.active).length;
}

const initialState = {
  users: [
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
  ],
};
function reducer(state, action) {
  switch (action.type) {
    case "CREATE_USER":
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      throw new Error("Unhandeled action");
  }
}
function App() {
  const nextId = useRef(4);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form, onChange, reset] = useInputs({
    username: "",
    email: "",
  });
  const { username, email } = form;
  const { users } = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
    reset();
  }, [username, email, reset]);

  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER",
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id,
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수:{count}</div>
    </>
  );
}
// const [inputs, setInputs] = useState({
//   username: "",
//   email: "",
// });

// const { username, email } = inputs;
// const onChange = useCallback(
//   (e) => {
//     const { name, value } = e.target;
//     setInputs({
//       ...inputs,
//       [name]: value,
//     });
//   },
//   [inputs]
// );
// // useCallback을 사용함으로 inputs가 변경되었을 때에만 새롭게 만들어내고, 평소에는 재사용한다.
// const [users, setUsers] = useState([
//   {
//     id: 1,
//     username: "velopert",
//     email: "public.velopert@gmail.com",
//     active: true,
//   },
//   {
//     id: 2,
//     username: "velopert2",
//     email: "public.velopert2@gmail.com",
//     active: false,
//   },
//   {
//     id: 3,
//     username: "velopert3",
//     email: "public.velopert3@gmail.com",
//     active: false,
//   },
// ]);

// const nextId = useRef(4);

// const onCreate = useCallback(() => {
//   const user = {
//     id: nextId.current,
//     username,
//     email,
//   };
//   setUsers((users) => users.concat(user)); // 이렇게 수정하면 setUsers의 callBack 함수의 파라미터로 최신 users를 조회하게 되므로 deps에서 제외시킬 수 있다.
//   // setUsers([...users, user]); 위와 동일
//   setInputs({
//     username: "",
//     email: "",
//   });
//   nextId.current += 1;
// }, [email, username]);

// const onRemove = useCallback((id) => {
//   setUsers((users) => users.filter((user) => user.id !== id));
// }, []);

// const onToggle = useCallback((id) => {
//   setUsers((users) =>
//     users.map((user) =>
//       user.id === id ? { ...user, active: !user.active } : user
//     )
//   );
// }, []);
// const count = useMemo(() => countActiveUsers(users), [users]);
// // users가 바뀔 때에만 호출이 되고, 그런게 아니면 이전 값을 그대로 사용한다.
// // 컴포넌트성능 최적화
// return (
//   <>
//     <CreateUser
//       username={username}
//       email={email}
//       onChange={onChange}
//       onCreate={onCreate}
//     />
//     <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
//     <div>활성 사용자 수: {count}</div>
//   </>
// );
// }
// useReducer를 적용하기 전 로직
// ====================================================================================

export default App;

// App컴포넌트가 rerender 될 때마다 컴포넌트 안의 함수도 새로 만들어지고 있다.
// 함수를 새로 만드는 일은 리소스를 많이 차지하는 작업은 아니다. 하지만 한 번 만든 함수를 재사용하는 것은 옳다.
// props가 바뀌지 않았다면 rerender를 안하도록 할 수 있다. 그 사전 작업으로 함수도 rerender가 안되고 재사용 하도록
// 만들어야한다.
