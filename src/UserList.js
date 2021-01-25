function User({ user, onRemove, onToggle }) {
  const { id, username, email, active } = user;
  //useEffect(() => {
  //  console.log("컴포넌트가 화면에 나타남");
  //  // props -> state로 설정
  //  // REST API
  //  // setInterval, setTimeout
  //  // UI가 화면에 나타난 이후임
  //  return () => {
  //    // clearInterval, clearTimeout
  //    console.log("컴포넌트가 화면에서 사라짐");
  //  };
  //}, []);
  // deps가 비어있으면 mount, unmount 될 때만 동작
  // useEffect(() => {
  //   console.log("user 값이 설정됨");
  //   console.log(user);
  //   return () => {
  //     console.log("user 값이 바뀌기 전");
  //     console.log(user);
  //   };
  //   // deps에 설정된 값이
  //   // 해당 값이 바뀔 때/생성 될 때 마다 호출,
  //   // 해당 값이 바뀌기 전은 return 부분을 진행
  // }, [user]); // user에 deps가 걸려있으므로 user가 생성되거나 변경될 때 동작함
  // useEffect(() => {
  //   console.log(user);
  // });
  // // deps를 생략하면
  // // 모든 컴포넌트에서 useEffect가 실행됨
  // // 부모컴포넌트가 리렌더 되면 자식컴포넌트가 리렌더 
  return (
    <div>
      <b
        style={{
          color: active ? "green" : "black",
          cursor: "pointer",
        }}
        onClick={() => onToggle(id)}
      >
        {username}:
      </b>
      <span>{email}</span>
      <button onClick={() => onRemove(id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default UserList;
/*onClick={onRemove(id)}>삭제 이렇게 하면 렌더링 되는 시점에 onRemove가
  동작한다.*/
