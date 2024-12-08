import React, { useState, useEffect} from 'react';
import Header from '../components/Header'; // Header included
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmailInput] = useState('');
  const [lastName, setUserLastName] = useState('');
  const [password, setPassword] = useState('');
  const [reTypePassword, setReTypePassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    if (password !== reTypePassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.put('http://localhost:4000/forgot-password', {
        email,
        lastName,
        password,
      });

      console.log(response.data); // Log response data

      if (response.status === 200) {
        alert("Password updated successfully!");
        navigate('/home-page');
      }
    } catch (error) {
      console.error("Error updating password:", error.response?.data || error.message);
      alert("Failed to update password. Please try again.");
    }
  };
// useEffect(() => {
//     const fetchHomepageData = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//           console.error('No token found. Redirecting to login.');
//           navigate('/login');
//           return;
//         }

//         const response = await axios.get('http://localhost:4000/forgot-password', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log('Forgot Password data:', response.data);
//       } catch (error) {
//         console.error('Error fetching forgot password page data:', error);
//         navigate('/login');
//       }
//     };

//     fetchHomepageData();
//   }, [navigate]);

  return (
    <div className="login-page">
      <Header />
      <div className="login-container">
        <div className="login-box">
          <Link to={'/login'} className='back-to-login'>Back to Login/Signup</Link>
          <h3>Change your password...</h3>
          <div className="login-form-container">
          <form>
            <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => {setEmailInput(e.target.value)}}
            required />
            <input 
            type="text" 
            placeholder="Last Name" 
            value={lastName}
            onChange={(e) => {setUserLastName(e.target.value)}}
            required/>
            <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            required />
            <input type="password" 
            placeholder="Re-Enter Password" 
            value={reTypePassword}
            onChange={(e) => {setReTypePassword(e.target.value)}}
            required />
      <div className='login-forgot'>
      <button 
      type="submit" 
      class="change-pwd-btn" 
      onClick={handleSubmit}>Change Password</button>
      </div>
      </form>
      </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
