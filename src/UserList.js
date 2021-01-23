import React from "react";

function User({ user, onRemove, onToggle }) {
  const { id, username, email, active } = user;
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
