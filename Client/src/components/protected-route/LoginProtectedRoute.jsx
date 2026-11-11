import { Navigate,Outlet } from "react-router-dom";
import UserLayout from "../Layout/Userlayout";
const LoginProtectedRoute=()=>{
    let token=localStorage.getItem("token")
    let role=localStorage.getItem("role")
    if(!token || !role || role.toLowerCase()!=="user"){
       return <Navigate to="/Signin" replace/>;

    }
    return(
    <UserLayout>
     <Outlet/>
     </UserLayout>
)
}
export default LoginProtectedRoute;