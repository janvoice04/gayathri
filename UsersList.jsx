import React from "react";
import { useGetUsersQuery } from "../../redux/apiSlice";
export default function UsersList() {
  const { data: users = [] } = useGetUsersQuery();
  const admins = users.filter((u) => u.role === "admin");
  const normalUsers = users.filter((u) => u.role === "user");
  return (
    <div className="users-wrapper">
      <div className="users-column">
        <h2 className="section-title">Admins</h2>
        <div className="list-grid">
          {admins.length > 0 ? (
            admins.map((u) => (
              <div className="card user-card" key={u._id}>
                <h3>{u.username}</h3>
                <p>📧 {u.email}</p>
                <p>📞 {u.phoneno}</p>
                <p>
                  Role: <span className={`role ${u.role}`}>
                    {u.role}
                  </span>
                </p>
                <p className="date">
                  Joined: {new Date(u.date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No admins found</p>
          )}
        </div>
      </div>
      <div className="users-column">
        <h2 className="section-title">Users</h2>
        <div className="list-grid">
          {normalUsers.length > 0 ? (
            normalUsers.map((u) => (
              <div className="card user-card" key={u._id}>
                <h3>{u.username}</h3>
                <p>📧 {u.email}</p>
                <p>📞 {u.phoneno}</p>
                <p>
                  Role: <span className={`role ${u.role}`}>
                    {u.role}
                  </span>
                </p>
                <p className="date">
                  Joined: {new Date(u.date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </div>
  );
}