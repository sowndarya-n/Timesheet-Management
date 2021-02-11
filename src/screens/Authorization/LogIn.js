import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
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
    const [error, setError] = useState("")
    const [, setLoading] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = e.target.elements;
    
        try {
          
          setError("")
          setLoading(true)
          await firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value);
          
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
    <div className="container-login100" style={{ backgroundImage: `url(https://img3.goodfon.com/wallpaper/big/7/26/chasy-budilnik-vremya-4010.jpg)` }}>
    
        <div className="wrap-login100 p-t-30 p-b-50">
        <h3 className="login100-form-title p-b-41 uppercase">
                Account &nbsp; Login
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
                        autoComplete="off"
                        required
                    />
                    <span className="focus-input100" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="m-t-45 m-l-40 bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg>
                    </span>
                </div>
                
                <div className="wrap-input100 validate-input" data-validate="Enter password">
                    <input 
                        
                        required
                        className="input100" 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        autoComplete="off"
                        ref={passwordRef}
                    />
                    <span className="focus-input100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="120" fill="currentColor" className="m-l-35 bi bi-keyboard" viewBox="0 0 16 16">
                            <path d="M14 5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12zM2 4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2z"/>
                            <path d="M13 10.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm0-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5 0A.25.25 0 0 1 8.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 8 8.75v-.5zm2 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-.5zm1 2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5-2A.25.25 0 0 1 6.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 6 8.75v-.5zm-2 0A.25.25 0 0 1 4.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 4 8.75v-.5zm-2 0A.25.25 0 0 1 2.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 2 8.75v-.5zm11-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0A.25.25 0 0 1 9.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 9 6.75v-.5zm-2 0A.25.25 0 0 1 7.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 7 6.75v-.5zm-2 0A.25.25 0 0 1 5.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 5 6.75v-.5zm-3 0A.25.25 0 0 1 2.25 6h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 2 6.75v-.5zm0 4a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm2 0a.25.25 0 0 1 .25-.25h5.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-5.5a.25.25 0 0 1-.25-.25v-.5z"/>
                    </svg>
                    </span>
                </div>
                
                <div className="container-login100-form-btn m-t-32">
                    
                    <button 
                        className="login100-form-btn" 
                        type="submit"
                        >
            
                        Login
                    </button>
                </div>
                <div className="container-login100-form-btn m-t-32">
                <Link to="/forgot-password" className="text1" >Forgot Password &nbsp;/&nbsp;</Link>
                <Link to="/SignUp" className="text1" >Sign Up </Link>
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