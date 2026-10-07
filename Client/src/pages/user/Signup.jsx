import { useState } from "react";
import "./Signup.css"
import perfumeeImage from "../../assets/perfumee.png";
import { Link } from "react-router-dom";
// import {Link} from 'react-router-dom'

export const Signup=()=>{
    let[formData,setformData]=useState({
        name:"",
        email:"",                         //user type chyyunna data evade store aakum
        password:"",
        confirmpassword:"",
        agree:false
    })

    let[formErr,setformErr]=useState({  //ellam fillakki =false
        name:false,
        email:false,                 //yeethallam field fillakki,ella ennamth ariyan for submision
        password:false,
        confirmpassword:false,
        agree:false
    })
    const onhandlechange=(e)=>{

     setformData((prev)=>({
        ...prev,
        [e.target.name]: e.target.type === "checkbox"
                ? e.target.checked
                : e.target.value

    }))
    }
    const onhandlesubmit=(e)=>{
        e.preventDefault()
        let next=true
        let err={
        name:false,
        email:false,              
        password:false,
        confirmpassword:false,
        agree:false,
        }
        if(formData.name==""){
            err.name=true
            next=false
        }
        if(formData.email=="" ||  !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(formData.email)){
            err.email=true
            next=false
        }
        if(formData.password=="" || formData.password.length<6){
            err.password=true
            next=false
        }
        if(formData.confirmpassword=="" || formData.confirmpassword!== formData.password){
            err.confirmpassword=true
            next=false
        }
        if(formData.agree==false){
            err.agree=true
            next=false
        }
        setformErr(err)
        if(next==true){
            alert("SignUp successfully")
            //code for backend
        }


    }
    const onhandleBlur=(e)=>{
       let {name}=e.target
         let err=false
         if(name=='name' && formData.name==""){
            err=true
         }
         else if(name=='email' && formData.email==""){
            err=true
         }
         else if(name=="password" && formData.password==""){
            err=true
         }
         else if(name=='confirmpassword' && formData.confirmpassword==""){
            err=true
         }
      
         setformErr((prev)=>({
            ...prev,
            [name]:err
         }))

    }
    return(
        <div className="main">
            
            <div className="up-image"
           style={{ backgroundImage: `url(${perfumeeImage})` }}>
             <div className="overlay">
        <h1>Let's Get Started!</h1>
        <p>
            Create your account and unlock the full potential of Fragranzia.
        </p>
    </div>

            </div>
         
            <form action="" onSubmit={onhandlesubmit}>
               <div className="up-form">
                <div className="up-buttonmain">
                <div className="up-button1">
            <button type="button">   
                {/* <button> engane koduthal button click chythal form submit aakum so ith satha button anu ennu parayanam */}
             <i className="bi bi-google"></i>
             GOOGLE
             </button>
             </div>
             <div className="up-button2">
            <button type="button">
                <i className="bi bi-facebook"></i>
                FACEBOOK</button>  
                </div>
                </div>
            <div className="up-divider">
                <span>Or sign up with email</span>
            </div>
            <br/>
            <div className="up-inputs">
           <div className="up-icon">
            <i className="bi bi-person-circle"></i>
            <input type="text" placeholder="Enter your username" name="name" onChange={onhandlechange} onBlur={onhandleBlur}/>
             
           </div>
           <p className="up-error">
            {formErr.name ? "please enter your name" : ""}
              </p>
            <div className="up-icon">
                <i className="bi bi-envelope"></i>
            <input type="email" placeholder="Enter your E-mail" name="email" onChange={onhandlechange} onBlur={onhandleBlur}/>
             </div>
              <p className="up-error">
            {formErr.email && "please enter your E-mail"}
            </p>
            <div className="up-icon">
            <i className="bi bi-lock"></i>
            <input type="password" placeholder="Enter your password" name="password" onChange={onhandlechange} onBlur={onhandleBlur}/>
           <i className="bi bi-eye-slash"></i>
         </div>
          <p className="up-error">
            {formErr.password  && "please enter your Password having alteast 6 charecter"}
            </p>
             <div className="up-icon">
                     <i className="bi bi-lock"></i>
            <input type="password" placeholder="confirm your password" name="confirmpassword" onChange={onhandlechange} onBlur={onhandleBlur}/>
        <i className="bi bi-eye-slash"></i>
          
           </div>
            <p className="up-error">
            {formErr.confirmpassword  && "please enter the same password"}
           </p>
               </div>
            <div className="up-agree">
            <input type="checkbox" name="agree"onChange={onhandlechange} />Agree with terms and condition
            <p className="error">
            {formErr.agree  && "please agree the above information"}
            </p>
            </div>
            <div className="up-submit">
            <button type="submit">Sign up</button>
        </div>
        <p className="up-signin">
            Alredy have an account?  <Link to="/Signin">signin</Link> 
             {/* <link to>Sign In</link> */}
        </p>
            </div>
            </form>
        </div>
    )
}