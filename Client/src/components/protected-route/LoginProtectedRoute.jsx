import { Navigate,Outlet } from "react-router-dom";
import UserLayout from "../Layout/Userlayout";
const LoginProtectedRoute=(props)=>{
    let token=localStorage.getItem("token")
    let role=localStorage.getItem("role")
    if(!token || !role || role.toLowerCase()!=="user"){
       return <Navigate to="/Signin" replace/>;

    }
    return(
    <UserLayout search={props.search}
      setSearch={props.setSearch}>
     <Outlet/>
     </UserLayout>
)
}
export default LoginProtectedRoute;