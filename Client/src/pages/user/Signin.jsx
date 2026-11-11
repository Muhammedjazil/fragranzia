import { useState } from "react";
import perfume3Image from "../../assets/perfume3.png"
import "./Signin.css"
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserService from "../../service/user-api-services/UserService";
import { toast } from "react-toastify";
export const Signin = () => {
 const {logindata}=UserService()

    const navigate = useNavigate();

    let [formData, setformData] = useState({
        email: "",
        password: ""
    })
 
    let [formErr, setformErr] = useState({    //ethellam field fillayhi,ella ennu kanikkan
        email: false,
        password: false
    })

    const onhandlechange = (e) => {
        setformData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))

    }
//     const onhandlesubmit = async (e) => {
//         e.preventDefault()

//         console.log("Login button clicked");
//         console.log("Form data:", formData);

//         let next = true
//         let err = {
//             email: false,
//             password: false                  //false-->initaially fill chythu
//         }
//         if (formData.email == "") {
//             err.email = true   //not filled
//             next = false
//         }
//         if (formData.password == "" || formData.password.length < 6) {
//             err.password = true
//             next = false
//         }
//         setformErr(err)

//         if (next == true) {

//             //code for backend
//             // const res = await axios.post("http://localhost:7000/api/auth/login", formData);
//             const res=await logindata(formData)
//             console.log(res);
            

//             localStorage.setItem("token", res.token);      //login ok the send token to frontend,and store in localstorage ,if we store in state that  couse redering
//             localStorage.setItem("role", res.role);      //login ok the send token to frontend,and store in localstorage ,if we store in state that  couse redering
// //========26/10/26==========add this last
// if (res.role?.toLowerCase() === "admin") {
//     toast.success("Login successfull!")
//   navigate("/Product");
// } else if (res.role?.toLowerCase() === "user") {
//     toast.success("Login successfull!")
//   navigate("/");
// } else {
//   alert("Invalid user role");
// }                                  //token used go to protected api like wishlist,cart
//         }                                                         // ..login ok then go to navigateHome

//     }

//============weadd===========when admin block then user can'  tlogin==================//

const onhandlesubmit = async (e) => {
  e.preventDefault();

  let next = true;

  let err = {
    email: false,
    password: false
  };

  if (formData.email === "") {
    err.email = true;
    next = false;
  }

  if (formData.password === "" || formData.password.length < 6) {
    err.password = true;
    next = false;
  }

  setformErr(err);

  if (!next) return;

  try {
    const res = await logindata(formData);

    localStorage.setItem("token", res.token);
    localStorage.setItem("role", res.role);

    if (res.role?.toLowerCase() === "admin") {
      toast.success("Login successful!");
      navigate("/Product");

    } else if (res.role?.toLowerCase() === "user") {
      toast.success("Login successful!");
      navigate("/");

    } else {
      toast.error("Invalid user role");
    }

  } catch (error) {
    const message =
      error.response?.data?.message || "Login failed. Please try again.";

    toast.error(message);
  }
};

//======================================================================================//

    return (
        <div className="form">
            <div className="image"
                style={{ backgroundImage: `url(${perfume3Image})` }}>
                <h1>Welcome Back</h1>
                <p>
                    Glade to see you again! Access your<br />
                    account to explore more
                </p>
            </div>
            <div className="inputs">
                <div className="buttons">
                    <div className="button1">

                        <button type="button">
                            <i className="bi bi-google"></i>
                            Google</button>
                    </div>
                    <div className="button2">
                        <button type="button">
                            <i className="bi bi-facebook"></i>
                            Facebook</button>
                    </div>
                </div>
                <br />
                <div className="divider">
                    <span>Or sign up with email</span>
                </div>
                <br />

                <form>
                    <div className="icon">
                        <i className="bi bi-person-circle"></i>
                        <input type="email" name="email" placeholder="Enter your email" onChange={onhandlechange} />
                    </div>
                    <p className="error">
                        {formErr.email && "Enter correct username"}
                    </p>

                    <div className="icon">
                        <i className="bi bi-lock"></i>
                        <input type="password" name="password" placeholder="Enter your password" onChange={onhandlechange} />
                    </div>
                    <p className="error">
                        {formErr.password && "please enter correct password"}
                    </p>

                    <h6>Forget Password?</h6>

                    <div className="submit">

                        <button  onClick={onhandlesubmit}>Log in</button>

                    </div>
                    <h3>Don't have an account?
                        {/* <Link to="">Sign Up</Link> */}<Link to="/signup">Sign Up</Link>
                    </h3>
                </form>
            </div>
        </div>
    )
}