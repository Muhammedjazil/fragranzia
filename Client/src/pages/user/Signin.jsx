import { useState } from "react";
import perfume3Image from "../../assets/perfume3.png"
import "./Signin.css"
import { Link } from "react-router-dom";

export const Signin=()=>{

let[formData,setformData]=useState({
    name:"",
    password:""
})

let[formErr,setformErr]=useState({
    name:false,
    password:false
})

const onhandlechange=(e)=>{
setformData((prev)=>({
    ...prev,
    [e.target.name]:e.target.value
}))

}
const onhandlesubmit=(e)=>{
    e.preventDefault()
    let next=true
    let err={
       name:false,
       password:false
    }
if(formData.name==""){
    err.name=true
    next=false
}
if(formData.password=="" || formData.password.length<6){
    err.password=true
    next=false
}
setformErr(err)

if(next==true){
    alert("signin completed")
    //code for backend
}

}

return(
    <div className="form">
<div className="image"
style={{ backgroundImage: `url(${perfume3Image})` }}>
    <h1>Welcome Back</h1>
    <p>
    Glade to see you again! Access your<br/>
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
<br/>
<div className="divider">
                <span>Or sign up with email</span>
            </div>
<br/>

        <form action="" onSubmit={onhandlesubmit}>
<div className="icon">
         <i className="bi bi-person-circle"></i>
        <input type="text" name="name" placeholder="Enter your username" onChange={onhandlechange} />
      </div>
      <p className="error">
       {formErr.name  && "Enter correct username"}
       </p>
       
        <div className="icon">
            <i className="bi bi-lock"></i>
        <input type="password" name="password" placeholder="Enter your password"onChange={onhandlechange}/>
    </div>
    <p className="error">
     {formErr.password && "please enter correct password"}
     </p>

      <h6>Forget Password?</h6>

       <div className="submit">
      
       <button type="submit">  <Link to="/Home"> Log in </Link></button>

       </div>
       <h3>Don't have an account?
        {/* <Link to="">Sign Up</Link> */}<Link to="/">Sign Up</Link>
        </h3>
        </form>
        </div>
    </div>
)
}