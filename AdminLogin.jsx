import React, { useState } from "react";
import { useLoginMutation } from "../../redux/apiSlice";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "admin",
  });
  const [login] = useLoginMutation();
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(form);
 if (res.data?.success) {
  dispatch(
    setLogin({
      user: res.data.user,
      token: res.data.token,
    })
  );

  navigate("/welcome");
} else {
  alert(res.data?.msg || "Login failed");
}
  };
  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin} autoComplete="off">
        <h2>Admin Login</h2>
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
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="new-password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <button type="submit">Login</button>
        <p
          onClick={() => navigate("/admin/register")}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Don't have an account? Register
        </p>
      </form>
    </div>
  );
}