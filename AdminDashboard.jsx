import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [complaints, setComplaints] = useState([]);

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [token, navigate]);
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:3000/getAllIssues");
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      console.log(err);
    }
  };
  const updateStatus = async (id) => {
    try {
      await fetch("http://localhost:3000/updateIssue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueId: id }),
      });

      fetchComplaints();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteComplaint = async (id) => {
    try {
      await fetch("http://localhost:3000/deleteIssue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueId: id }),
      });

      fetchComplaints();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app-layout">
      <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar
        setSidebarOpen={setSidebarOpen}
        className={sidebarOpen ? "sidebar open" : "sidebar"}
      />
      <div className="main-section">
        <Outlet
          context={{
            complaints,
            updateStatus,
            deleteComplaint,
          }}
        />
      </div>
    </div>
  );
}