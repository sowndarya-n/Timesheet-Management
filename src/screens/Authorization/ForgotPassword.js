import React, { useRef, useState } from "react"
import {  Alert} from "react-bootstrap"
import { Link } from "react-router-dom"
import firebaseConfig from "../config.js";
import '../App.css'

export default function ForgotPassword() {
  const emailRef = useRef()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await firebaseConfig.auth().sendPasswordResetEmail(emailRef.current.value)
      setMessage("Check your inbox for further instructions")

    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (



    <div className="limiter">
        
    <div className="container-login100" style={{ backgroundImage: `url(https://th.bing.com/th/id/R3b5f96492b1b58bf0f86900870ace053?rik=916wHjZ6ZvvFag&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fSo3qZvl.jpg&ehk=1K7dvYwcaaNfjnkYJTp7NCPCRiOU02brJE%2fvPdyW%2byc%3d&risl=&pid=ImgRaw)` }}>
        <div className="wrap-login100 p-t-30 p-b-50">
            <span className="login100-form-title p-b-41 uppercase">
                Password &nbsp; Reset
            </span>
            <form 
                className="login100-form validate-form p-b-33 p-t-5"
                onSubmit={handleSubmit}
            >
                <div className="wrap-input100 validate-input" data-validate="Enter username">
                    <input 
                        className="input100" 
                        name="email" 
                        placeholder="Email" 
                        type="email" 
                        autoComplete="off"
                        ref={emailRef} 
                        required
                        
                    />
                    <span className="focus-input100" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="m-t-45 m-l-40 bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg>
                    </span>
                </div>
                <div className="container-login100-form-btn m-t-32">
                    
                    <button 
                        className="login100-form-btn" 
                        type="submit"
                        disabled={loading}
                        >
                            Reset Password
                    </button>
                </div>
                <div className=" text  m-t-32" style={{textAlign:"center"}}>
                <Link to="/" className='text1' >Login / </Link>
                <Link to="/SignUp" className='text1' > SignUp</Link>
                </div>
                <div className="container-login100-form-btn m-t-32 red ">
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                </div>
            </form>
        </div>
    </div>
</div>
  )
}