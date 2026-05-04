import React, { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../../redux/apiSlice";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    phoneno: "",
    role: "admin"
  });
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await login(form);

    if (res.data?.success) {

      const user = res.data.user;
      const token = res.data.token;

      dispatch(setLogin({ user, token }));

      navigate("/admin/dashboard");

    } else {
      alert(res.data?.msg || "Login failed");
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await register(form);

    if (res.data?.success) {
      alert("Registered successfully! Please login.");
      setIsLogin(true);
    } else {
      alert(res.data?.msg || "Register failed");
    }
  };

  return (
    <div className="login-container">
      <form
        className="login-box"
        onSubmit={isLogin ? handleLogin : handleRegister}
        autoComplete="off"
      >
        <h2>{isLogin ? "Admin Login" : "Admin Register"}</h2>
        <input
          placeholder="Username"
          autoComplete="off"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />
        {!isLogin && (
          <input
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        )}
        {!isLogin && (
          <input
            placeholder="Phone Number"
            onChange={(e) =>
              setForm({ ...form, phoneno: e.target.value })
            }
          />
        )}
        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
        <p
          onClick={() => setIsLogin(!isLogin)}
          style={{
            cursor: "pointer",
            color: "blue",
            marginTop: "10px"
          }}
        >
          {isLogin
            ? "Don't have account? Register"
            : "Already have account? Login"}
        </p>

      </form>
    </div>
  );
}