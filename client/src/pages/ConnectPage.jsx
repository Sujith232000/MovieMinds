import React from 'react';
import '../styles/ConnectPage.css';
import { useNavigate } from 'react-router-dom';

const ConnectPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem('authToken');
          navigate('/login');
        } else {
          console.error('Failed to log out from server');
        }
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };
  return (
    <div className="connect-page">
    <header className="header">
      <div className="profile">
        <img
          src="https://via.placeholder.com/50"
          alt="User"
          className="profile-pic"
        />
        <span className="username-badge">MUNNA_VAR</span>
      </div>
      <h1 className="title">MOVIE MiND’s - Connect</h1>
      <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
    </header>

    {/* Search Section */}
    <div className="search-section">
      <h2>Need People with similar interest?</h2>
      <div className="search-inputs">
        <input type="text" placeholder="Enter Email Address..." />
        <span className="or">OR</span>
        <input type="text" placeholder="Enter Username..." />
        <button className="connect-btn">CONNECT</button>
      </div>
    </div>

    {/* Friends and Pending Requests Section */}
    <div className="content-section">
      <div className="friends-section">
        <h2>FRIENDS</h2>
        <ul>
          {[
            { name: "JOBLIN K JAMES", img: "https://via.placeholder.com/30" },
            { name: "SONA G JOHN", img: "https://via.placeholder.com/30" },
            { name: "RAJAT NAGAR", img: "https://via.placeholder.com/30" },
            { name: "MAZHAR HUSSAIN", img: "https://via.placeholder.com/30" },
          ].map((friend, index) => (
            <li key={index}>
              <img src={friend.img} alt={friend.name} className="profile-pic" />
              <span className="friend-name">{friend.name}</span>
              <button className="unfriend-btn">UNFRIEND</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="pending-requests-section">
        <h2>PENDING REQUESTS</h2>
        <ul>
          {[
            { name: "VEDANT MHATRE", img: "https://via.placeholder.com/30" },
            { name: "SUJITH REDDY A", img: "https://via.placeholder.com/30" },
          ].map((request, index) => (
            <li key={index}>
              <img src={request.img} alt={request.name} className="profile-pic" />
              <span className="friend-name">{request.name}</span>
              <button className="withdraw-btn">WITHDRAW</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
};

export default ConnectPage;
