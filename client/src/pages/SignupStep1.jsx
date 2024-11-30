
import React, { useState } from 'react';
import {Link, useLocation } from 'react-router-dom';
import '../styles/SignupStep1.css';
import Header from '../components/Header';
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const SignupStep1 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const[firstName, setFirstName] = useState('');
  const[lastName, setLastName] = useState('');
  const[email, setEmailInput] = useState('');
  const[password, setPassword] = useState('');
  const[checkPassword, setCheckPassword] = useState('');
  const { setEmail } = useUser();

  async function signUpStep1(event){
    event.preventDefault();
    const response = await fetch('http://localhost:4000/signup-step1',{
            method: 'POST',
            body: JSON.stringify({firstName, lastName, email, password, checkPassword}),
            headers: {'Content-Type':'application/json'},
    })
    if(response.status === 200){
        setEmail(email);
        navigate('/signup-step2');
    }else{
        alert('registration failed')
    }
}

  

  return (
    <div className="signup-page">
      <Header />
      <div className="signup-container">
        <div className="signup-box">
        <div className="auth-nav">
        <Link to="/login" className={location.pathname === '/login' ? 'active' : 'non-active'}>
          Login
        </Link>
        <Link to="/signup-step1" className={location.pathname === '/signup-step1' ? 'active' : 'non-active'}>
          | Signup
        </Link>
      </div>
      <p>Sign up to get started...</p>
        <form>
          <input type="text" 
          placeholder="First Name" 
          value={firstName}
          onChange={(event)=>(setFirstName(event.target.value))}
          required />
          <input type="text" 
          placeholder="Last Name" 
          value={lastName}
          onChange={(event)=>(setLastName(event.target.value))}
          required />
          <input type="email" 
          placeholder="Email Address" 
          value={email}
          onChange={(event)=>(setEmailInput(event.target.value))}
          required />
          <input type="password" 
          placeholder="Password"
          value={password}
          onChange={(event)=>(setPassword(event.target.value))} 
          required />
          <input type="password" 
          placeholder="Re-Type Password" 
          value={checkPassword}
          onChange={(event)=>(setCheckPassword(event.target.value))}
          required />
          <div className="signup-btn-div">
          <button type="submit" className="signup-btn" onClick={signUpStep1}>NEXT</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default SignupStep1;
