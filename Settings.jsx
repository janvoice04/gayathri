import React from "react";
import { useGetUsersQuery, useGetComplaintsQuery } from "../../redux/apiSlice";

export default function Settings() {
  const { data: users = [] } = useGetUsersQuery();
  const { data: complaints = [] } = useGetComplaintsQuery();
  return (
    <div className="settings-box">
      <h2>⚙ Admin Settings</h2>
      <div className="setting-item">
        <p>Total Users: {users.length}</p>
      </div>
      <div className="setting-item">
        <p>Total Complaints: {complaints.length}</p>
      </div>

      <div className="setting-item">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Reset App
        </button>
      </div>

    </div>
  );
}