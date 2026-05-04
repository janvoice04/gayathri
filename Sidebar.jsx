import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ className, setSidebarOpen }) {

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path) => {
    navigate(`/admin/${path}`);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className={className}>
      <h3>Admin</h3>

      <p
        onClick={() => handleClick("dashboard")}
        className={location.pathname.includes("dashboard") ? "active" : ""}
      >
        📊 Dashboard
      </p>

      <p
        onClick={() => handleClick("complaints")}
        className={location.pathname.includes("complaints") ? "active" : ""}
      >
        📍 Complaints
      </p>

      <p
        onClick={() => handleClick("users")}
        className={location.pathname.includes("users") ? "active" : ""}
      >
        👤 Users
      </p>

      <p
        onClick={() => handleClick("settings")}
        className={location.pathname.includes("settings") ? "active" : ""}
      >
        ⚙ Settings
      </p>
    </div>
  );
}