import React, { useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import '../styles/SignupStep1.css';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../contexts/UserContext";

const SignupStep2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [preference1, setPreference1] = useState("");
  const [preference2, setPreference2] = useState("");
  const [preference3, setPreference3] = useState("");
  const [preLanguage, setPreLanguage] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const { email } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!preference1 || !preference2 || !preference3 || !preLanguage || !socialLinks) {
      alert("Please fill out all the fields");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/signup-step2', {
        method: "POST",
        body: JSON.stringify(
          { 
            email,
            preference1, 
            preference2, 
            preference3, 
            preLanguage, 
            socialLinks ,
          }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        navigate('/home-page');
      } else {
        alert("Failed to submit your responses");
      }
    } catch (error) {
      console.error("Error submitting responses:", error);
      alert("An error occurred while submitting your responses");
    }
  };
  return (
    <div className="signup-page">
      <Header />
      <div className="signup-container">
        <div className="signup-box">
        <div className="auth-nav">
        <Link to="/login" className={location.pathname === '/login' ? 'active' : 'non-active'}>
          Login
        </Link>
        <Link to="/signup-step2" className={location.pathname === '/signup-step2' ? 'active' : 'non-active'}>
          | Signup
        </Link>
        </div>
        <p>Tell us more about your preferences...</p>
        <form>
          <select 
          value={preference1}
          onChange={(e) => setPreference1(e.target.value)}
          >
            <option value="">Movie Preference 1</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
          </select>
          <select 
          value={preference2}
          onChange={(e) => setPreference2(e.target.value)}
           >
            <option value="">Movie Preference 2</option>
            <option value="Thriller">Thriller</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
          <select 
          value={preference3} 
          onChange={(e) => setPreference3(e.target.value)}
          >
            <option value="">Movie Preference 3</option>
            <option value="Thriller">History</option>
            <option value="Romance">Horror</option>
            <option value="Sci-Fi">Pyschological-Thriller</option>
          </select>
          <select 
          value={preLanguage}
          onChange={(e) => setPreLanguage(e.target.value)}
          >
            <option value="">Preferred Language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
          <input type="url" 
          className="social-media-url" 
          placeholder="Social Media URL" 
          value={socialLinks}
          onChange={(e)=>{setSocialLinks(e.target.value)}}
          />
          <div className='signup-forgot'>
          <button type="submit" className="signup-btn" onClick={handleSubmit}>SIGN UP</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default SignupStep2;
