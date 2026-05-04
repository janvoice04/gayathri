import React from "react";
import { useGetUsersQuery } from "../../redux/apiSlice";
export default function UsersList() {
  const { data: users = [] } = useGetUsersQuery();
  return (
    <div className="list-grid">
      {users.map((u) => (
        <div className="card user-card" key={u._id}>
          <h3>{u.username}</h3>
          <p>📧 {u.email}</p>
          <p>📞 {u.phoneno}</p>
          <span className={`role ${u.role}`}>{u.role}</span>
          <p className="date">
            Joined: {new Date(u.date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}