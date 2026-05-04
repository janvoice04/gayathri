import React from "react";
import "./ComplaintCard.css";

export default function ComplaintCard({
  complaint,
  onUpdateStatus,
  onDelete,
}) {
  const imageUrl = complaint.issue_image
    ? `http://localhost:3000/uploads/${complaint.issue_image}`
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="complaint-card">
      <img src={imageUrl} alt="issue" className="complaint-img" />

      <div className="complaint-content">
        <h3>{complaint.issue_name}</h3>
        <p>📍 {complaint.issue_address}</p>
        <p>📝 {complaint.issue_description}</p>
        <span
          className={`status-badge ${complaint.issue_status?.toLowerCase()}`}
          onClick={() => onUpdateStatus(complaint._id)}
        >
          {complaint.issue_status}
        </span>
      </div>
      {complaint.issue_status === "Resolved" && (
        <button
          onClick={() => onDelete(complaint._id)}
          className="delete-btn"
        >
          Delete
        </button>
      )}
    </div>
  );
}