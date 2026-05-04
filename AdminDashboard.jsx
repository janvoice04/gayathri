import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

import Welcome from "./Welcome";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ComplaintCard from "../components/ComplaintCard";

import {
  useGetComplaintsQuery,
  useGetUsersQuery
} from "../../redux/apiSlice";

export default function AdminDashboard() {

  const [started, setStarted] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      setStarted(false);
      navigate("/admin", { replace: true });
    }
  }, [token]);
  const { data: complaints = [] } = useGetComplaintsQuery(undefined, {
    skip: !token,
  });

  const { data: users = [] } = useGetUsersQuery(undefined, {
    skip: !token,
  });
  const getUserById = (id) => {
    return users.find((u) => u._id === id);
  };
  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.issue_name?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || c.issue_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (!started) {
    return <Welcome onStart={() => setStarted(true)} />;
  }

  return (
    <div className="app-layout">

      <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        setSidebarOpen={setSidebarOpen}
        className={sidebarOpen ? "sidebar open" : "sidebar"}
      />
      <div className="main-section">
        {activePage === "dashboard" && (
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
        )}
        {activePage === "complaints" && (
          <>
            <div className="filters">
              <input
                type="text"
                placeholder="Search complaints..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="Pending">Pending</option>
                <option value="Assigned">Assigned</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div className="list-grid">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((c) => {
                  const user = getUserById(c.userId);

                  return (
                    <div key={c._id} className="admin-view-card">
                      <div className="user-profile-card">
                        <h4>👤 User Details</h4>
                        <p><b>Name:</b> {user?.username}</p>
                        <p><b>Email:</b> {user?.email}</p>
                        <p><b>Phone:</b> {user?.phoneno}</p>
                      </div>
                      <ComplaintCard complaint={c} />
                    </div>
                  );
                })
              ) : (
                <p>No complaints found</p>
              )}
            </div>
          </>
        )}
        {activePage === "users" && (
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
        )}
        {activePage === "settings" && (
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
        )}

      </div>
    </div>
  );
}