import React, { useState } from "react";
import ComplaintCard from "../components/ComplaintCard";
import { useOutletContext } from "react-router-dom";
export default function ComplaintsList() {
  const { complaints, updateStatus, deleteComplaint } = useOutletContext();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredComplaints = complaints.filter((c) => {
    const matchSearch =
      c.issue_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.issue_description?.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All" || c.issue_status === statusFilter;
    return matchSearch && matchStatus;
  });
  return (
    <div>
      <div className="admin-controls">
        <input
          type="text"
          placeholder="Search complaints..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
       <div className="filter-buttons">
          {["All", "Pending", "Assigned", "Resolved"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={statusFilter === status ? "active-filter" : ""}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
      <div className="list-grid">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((c) => (
            <ComplaintCard
              key={c._id}
              complaint={c}
              onUpdateStatus={updateStatus}
              onDelete={deleteComplaint}
            />
          ))
        ) : (
          <p>No complaints found</p>
        )}
      </div>

    </div>
  );
}