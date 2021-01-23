import React from "react";

function User({ user }) {
  const { username, email } = user;
  return (
    <div>
      <b>{username}: </b>
      <span>{email}</span>
    </div>
  );
}

function UserList() {
  const users = [
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
  ];

  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default UserList;
