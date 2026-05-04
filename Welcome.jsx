import React from "react";
import "./welcome.css";

export default function Welcome({ onStart }) {
  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1>🏛️ JanVoice Portal</h1>

        <p>
          Government Grievance Reporting System.<br />
          Report local issues and track status easily.
        </p>

        <ul>
          <li>📸 Upload Photos</li>
          <li>📍 Location Tracking</li>
          <li>📊 Complaint Monitoring</li>
          <li>🏛️ Admin Control</li>
        </ul>

        <button onClick={onStart}>🚀 Get Started</button>
      </div>
    </div>
  );
}