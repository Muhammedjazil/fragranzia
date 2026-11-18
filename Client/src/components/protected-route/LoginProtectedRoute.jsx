import { Navigate, Outlet } from "react-router-dom";

const LoginProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role || role.toLowerCase() !== "user") {
    return <Navigate to="/Signin" replace />;
  }

  return <Outlet />;
};

export default LoginProtectedRoute;