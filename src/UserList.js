import React from "react";

function User({ user, onRemove }) {
  const { id, username, email } = user;
  return (
    <div>
      <b>{username}: </b>
      <span>{email}</span>
      <button onClick={() => onRemove(id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default UserList;
/*onClick={onRemove(id)}>삭제 이렇게 하면 렌더링 되는 시점에 onRemove가
  동작한다.*/
