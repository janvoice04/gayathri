import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./jan/admin/AdminLogin";
import AdminDashboard from "./jan/admin/AdminDashboard";
import ProtectedRoute from "./jan/admin/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/admin" />} />

      <Route path="/admin" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      /> 

    </Routes>
  );
}