import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
import logo from '../resources/logo-sample.png';
import logout from '../resources/signout-icon.png'
import  "./Dashboard.css"
const Dashboard = ({username}) => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/" />;

    

  }

  return (

   
    
    <div>
       <nav className="navbar navbar-light bg-dark justify-content-between">
            <div className="m-l-10 navbar-brand  login100-form-title" style={{color:'#fff'}}>
              <img src={logo} alt="" style={{height: '45px'}}></img>
              </div>
          <form className="form-inline">
            <p style={{color:'#fff'}}>{username} &nbsp;
            <button className="m-r-10" style={{color:'white'}} onClick={() => firebaseConfig.auth().signOut()}><img src={logout} alt="" style={{height: '25px'}}></img></button>
            </p>  </form>
        </nav>
       
    </div>
  );
};

export default Dashboard;