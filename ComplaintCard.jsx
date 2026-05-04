import React from "react";
import { useDeleteIssueMutation } from "../../redux/apiSlice";
import "./ComplaintCard.css";
export default function ComplaintCard({ complaint }) {
  const [deleteIssue] = useDeleteIssueMutation();
  const imageUrl =
    complaint.issue_image
      ? `http://localhost:3000/uploads/${complaint.issue_image}`
      : "https://via.placeholder.com/300x200?text=No+Image";
  const handleDelete = async () => {
    try {
      await deleteIssue({ issueId: complaint._id }).unwrap();
      alert("Complaint deleted successfully");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };
  return (
    <div className="complaint-card">
      <img
        src={imageUrl}
        alt="issue"
        className="complaint-img"
      />
      <div className="complaint-content">
        <h3>{complaint.issue_name}</h3>
        <p>📍 {complaint.issue_address}</p>
        <p>📝 {complaint.issue_description}</p>
        <span className={`status ${complaint.issue_status?.toLowerCase()}`}>
          {complaint.issue_status}
        </span>
      </div>
      {complaint.issue_status === "Resolved" && (
        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      )}

    </div>
  );
}