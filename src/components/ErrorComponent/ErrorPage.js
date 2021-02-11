import React from "react";
import './ErrorPage.css'
import ERROR from '../resources/ERROR.png'


export default function ErrorPage({history}){
    return (
        <div>
            <div className='center'>
                <img src={ERROR} alt=""style={{height: '500px'}}></img>
            </div>
            <div className='center '>
                <p className='fs-20'>Redirecting to <span  style={{color :'dodgerblue', cursor:'pointer',display:'inline-block'}} onClick={()=> history.push('/')}> Login Page</span> </p>
            </div>
        </div>
    );

}