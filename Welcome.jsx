import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./welcome.css";
export default function Welcome() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  console.log("WELCOME TOKEN:", token);

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
        <button onClick={() => navigate("/admin/dashboard")}>
          🚀 Get Started
        </button>
      </div>
    </div>
  );
}