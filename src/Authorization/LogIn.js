import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext, useAuth } from "./Auth";
import firebaseConfig from "../config";
import { Link } from "react-router-dom"
import  { useRef, useState } from "react"
import { Alert } from "react-bootstrap"
import "./Authorization.css"
const LogIn = ({setUsername,username}) => {


    React.useEffect(() => {
        localStorage.setItem('myValueInLocalStorage', username);
      }, [username]);

    const changeState = (event) => { 
        setUsername(event.target.value);  
       };

    const emailRef = useRef()
    const passwordRef = useRef()
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = e.target.elements;
    
        try {
          setMessage("")
          setError("")
          setLoading(true)
          await firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value);
          setMessage("Check your inbox for further instructions")
        } catch {
          setError("Invalid Credentials")
        }
    
        setLoading(false)
      }


    
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return (
    
    <Redirect to="/home" />
    );
  }
  return (

    <div className="limiter">
    <div className="container-login100" style={{ backgroundImage: `url(https://itsabouttime.run/wp-content/uploads/2013/10/background-51.jpg)` }}>
    
        <div className="wrap-login100 p-t-30 p-b-50">
        <h3 className="login100-form-title p-b-41">
                Account Login
            </h3>
            <form 
                className="login100-form validate-form p-b-33 p-t-5"
                onSubmit={handleSubmit}
            >
                <div className="wrap-input100 validate-input" data-validate="Enter username">
                    <input 
                        className="input100" 
                        type="email" 
                        name="email" 
                        
                        ref={emailRef}
                        placeholder="Email"
                        onChange={changeState}
                        required
                    />
                    <span className="focus-input100" data-placeholder="&#xF002;"></span>
                </div>
                
                <div className="wrap-input100 validate-input" data-validate="Enter password">
                    <input 
                        
                        required
                        className="input100" 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        ref={passwordRef}
                    />
                    <span className="focus-input100" data-placeholder="&#xf11c;"></span>
                </div>
                
                <div className="container-login100-form-btn m-t-32">
                    
                    <button 
                        className="login100-form-btn" 
                        type="submit"
                        >
            
                        Login
                    </button>
                </div>
                <div className="container-login100-form-btn  m-t-32">
                <Link to="/forgot-password" >Forgot Password?</Link>
                </div> 
                <div className="container-login100-form-btn m-t-32 red ">
                    {error && <Alert variant="danger">{error}</Alert>}
                    
                </div>   
            </form>
        </div>
    </div>
</div>

  );
};

export default LogIn;