import React from "react";
import { useGetComplaintsQuery, useGetUsersQuery } from "../../redux/apiSlice";
export default function DashboardHome() {
  const { data: complaints = [] } = useGetComplaintsQuery();
  const { data: users = [] } = useGetUsersQuery();
  return (
    <div className="hero-grid">
      <div className="card dashboard-card">
        <h4>Total Complaints</h4>
        <p>{complaints.length}</p>
      </div>
      <div className="card dashboard-card">
        <h4>Total Users</h4>
        <p>{users.length}</p>
      </div>

    </div>
  );
}