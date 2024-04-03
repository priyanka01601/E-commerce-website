
import React from "react";
import "./css/LoginSignup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginSignup=()=>{

    const [state,setState]=React.useState("Login");

    const [formData,setFormData]=React.useState({
        username:"",
        password:"",
        confirmPassword: "", 
        email:"",
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const [passwordStrength, setPasswordStrength] = React.useState("");
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [error, setError] =React.useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };


    const changeHandler=(e)=>{
        const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Check if the field being updated is the password field
    if (name === "password") {
        validatePasswordStrength(value);
    }

    }
    const validatePasswordStrength = (password) => {
        // Check if password contains at least 8 characters and meets other criteria
        if (!password) {
            setPasswordStrength(""); // Reset password strength if password is empty
            return;
        }
        const strongRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        const mediumRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/;

        if (strongRegex.test(password)) {
            setPasswordStrength("Strong");
        } else if (mediumRegex.test(password)) {
            setPasswordStrength("Medium");
        } else {
            setPasswordStrength("Weak. Please enter a strong password");
        }
    }

    const login=async()=>{
        console.log("Login function excuted",formData);
        let responseData;
        await fetch("http://localhost:4000/login",{
            method:"POST",
            headers:{
                Accept:"application/form-data",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData),
        }).then((resp)=>resp.json()).then((data)=>responseData=data);

        if(responseData.success)
        {
            localStorage.setItem("auth-token",responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors);
        }

    }

    const signup=async()=>{
        console.log("Signup function excuted",formData);
        if (passwordStrength === "Weak") {
            setError("Password is weak. Please choose a stronger password.");
            return;
        }
        let responseData;
        await fetch("http://localhost:4000/signup",{
            method:"POST",
            headers:{
                Accept:"application/form-data",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData),
        }).then((resp)=>resp.json()).then((data)=>responseData=data);

        if(responseData.success)
        {
            localStorage.setItem("auth-token",responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors);
        }
    }





    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==="Sign Up" && <input type="text" name="username" value={formData.username} onChange={changeHandler}placeholder="Your name"/> } 
                    <input type="email" name="email" value={formData.email} onChange={changeHandler}placeholder="Email Address"/>
                    <div className="password-field">
                        <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={changeHandler} placeholder="Password" />
                        <i className="password-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </i>
                    </div>
                    {state === "Sign Up" &&  passwordStrength && <p>Password Strength: {passwordStrength}</p>}
                    {state === "Sign Up" && (
                        <div className="password-field">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={changeHandler}
                                placeholder="Confirm Password"
                            />
                            <i className="password-icon" onClick={toggleConfirmPasswordVisibility}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </i>
                        </div>
                    )}


                </div>
                <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
                {state==="Sign Up"?<p className="loginsignup-login">
                    Already have an account? <span onClick={()=>{setState("Login")}}>Login</span>
                </p>:<p className="loginsignup-login">
                    Create an account <span onClick={()=>{setState("Sign Up")}}>Click here</span>
                </p>}

                
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id=""/>
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
            </div>

        </div>
    )
}

export default LoginSignup
