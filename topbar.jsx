import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { apiSlice } from "../../redux/apiSlice";

export default function Topbar({ toggleSidebar }) {

  const dispatch = useDispatch();  
  const navigate = useNavigate();

const handleLogout = () => {
  dispatch(logout());
  dispatch(apiSlice.util.resetApiState());

  navigate("/admin", { replace: true });
};
  return (
    <div className="topbar">
      <button className="hamburger" onClick={toggleSidebar}>☰</button>

      <h1 className="logo">JanVoice</h1>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}