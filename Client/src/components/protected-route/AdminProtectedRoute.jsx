import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../Layout/Adminlayout";

const AdminProtectedRoute = () => {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Check authentication and admin role
  if (!token || !role || role.toLowerCase() !== "admin") {
    return <Navigate to="/Signin" replace />;
  }

  // Show AdminLayout and its nested page
  return( 
  <AdminLayout>
  <Outlet/>
  </AdminLayout>
          
  )
           
};

export default AdminProtectedRoute;