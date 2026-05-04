import React, { useState } from "react";
import { useLoginMutation } from "../../redux/apiSlice";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "admin"
  });

  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await login(form);

    if (res.data?.success) {

      const user = res.data.user;
      const token = res.data.token;

      dispatch(setLogin({ user, token }));

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/admin/dashboard");

    } else {
      alert(res.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin} autoComplete="off">

        <h2>Admin Login</h2>

        <input
          name="admin_username"
          placeholder="Username"
          autoComplete="off"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          name="admin_password"
          placeholder="Password"
          autoComplete="new-password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Login</button>

      </form>
    </div>
  );
}