import React, { useState } from "react";
import { useRegisterMutation } from "../../redux/apiSlice";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
export default function AdminRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    phoneno: "",
    password: "",
    role: "admin",
  });
  const [register] = useRegisterMutation();
  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await register(form);
    if (res.data?.success) {
      alert("Registered successfully!");
      navigate("/admin/login");
    } else {
      alert(res.data?.msg || "Register failed");
    }
  };
  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleRegister} autoComplete="off">
        <h2>Admin Register</h2>
        <input
          type="text"
          name="fakeuser"
          style={{ display: "none" }}
          autoComplete="username"
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          autoComplete="off"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="off"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Phone Number"
          name="phone"
          autoComplete="off"
          onChange={(e) =>
            setForm({ ...form, phoneno: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="new-password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <button type="submit">Register</button>
        <p
          onClick={() => navigate("/admin/login")}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Already have an account? Login
        </p>

      </form>
    </div>
  );
}