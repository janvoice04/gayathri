import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "./jan/admin/AdminLogin";
import AdminRegister from "./jan/admin/AdminRegister";
import AdminDashboard from "./jan/admin/AdminDashboard";
import Welcome from "./jan/components/Welcome";
import DashboardHome from "./jan/admin/DashboardHome";
import ComplaintsList from "./jan/admin/ComplaintsList";
import UsersList from "./jan/admin/UsersList";
import Settings from "./jan/admin/Settings";
import ProtectedRoute from "./jan/admin/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/admin/login" />} />

      {/* LOGIN */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* REGISTER */}
      <Route path="/admin/register" element={<AdminRegister />} />

      {/* WELCOME */}
      <Route
        path="/welcome"
        element={
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        }
      />

      {/* ADMIN DASHBOARD LAYOUT */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" />} />

        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="complaints" element={<ComplaintsList />} />
        <Route path="users" element={<UsersList />} />
        <Route path="settings" element={<Settings />} />
      </Route>

    </Routes>
  );
}