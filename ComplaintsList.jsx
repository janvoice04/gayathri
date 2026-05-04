import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../user/topbar";
import ComplaintCard from "../components/ComplaintCard";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const res = await fetch("http://localhost:5000/api/complaints");
    const data = await res.json();
    setComplaints(data);
  };

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/complaints/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    setComplaints((prev) =>
      prev.map((c) =>
        c._id === id ? { ...c, status } : c
      )
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      
      <Sidebar />

      <div style={{ flex: 1, background: "#f4f6f9" }}>
        <Topbar />

        <div style={{ padding: "20px" }}>
          <h2>Municipality Complaints Dashboard</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px" }}>
            {complaints.map((c) => (
              <ComplaintCard
            key={c._id}
            complaint={c}
            onUpdateStatus={updateStatus}
            onDelete={deleteComplaint}
/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}