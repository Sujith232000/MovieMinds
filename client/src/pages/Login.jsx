import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/Login.css';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from "../contexts/UserContext";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const[email, setEmailInput] = useState('');
  const[password, setPassword] = useState('');
  const { setEmail } = useUser();
  const handleLogin = async (email, password) => {
    let data = { email, password };
    setEmail(email);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
  
    try {
      const response = await axios.request(config);
      console.log(response.data); // Log response data
      localStorage.setItem('authToken', response.data.token); // Save the token to localStorage
      navigate('/home-page');
    } catch (error) {
      if ((error.response && error.response.status === 400) || (error.response.status === 401)) {
        alert('Invalid email or password. Please try again.');
      } else if (error.response && error.response.status === 404) {
        alert('User not found. Please check your email and password.');
      } else {
        console.error('An unexpected error occurred:', error);
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };
  



  return (
    <div className="login-page">
      <Header />
      <div className="login-container">
        <div className="login-box">
        <div className="auth-nav">
        <Link to="/login" className={location.pathname === '/login' ? 'active' : 'non-active'}>
          Login |
        </Link>
        <Link to="/signup-step1" className={location.pathname === '/signup-step1' ? 'active' : 'non-active'}>
          Signup
        </Link>
      </div>
          <p>Get login to access your account</p>
          <div className="login-form-container">
          <div>
            <input type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmailInput(e.target.value)}
            required />
            <input type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
            <div className="options">
            <label>
              <input type="checkbox"/>
            </label>
            <span className='remember-me'>Remember Me</span>
            </div>
            <div className='login-forgot'>
            <button className="login-btn" onClick={() => handleLogin(email, password)}>LOGIN</button>

            <a href="http://localhost:3000/forgot-password" className="forgot-password">Forgot Password?</a>
            </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
