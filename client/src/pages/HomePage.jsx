import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/HomePage.css';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';


const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('No token found. Redirecting to login.');
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:4000/home-page', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Homepage data:', response.data);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
        navigate('/login');
      }
    };

    fetchHomepageData();
  }, [navigate]);
 // Add navigate to the dependency array

  const handleLogout = () => {
    fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to login page
          localStorage.removeItem('authToken'); // Clear the token from localStorage
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
    <div className="homepage-container">
      <aside className="sidebar">
        <h1 className="logo" style={{ fontWeight: '1000', fontSize: '32px' }}>MOVIE MiND's</h1>
        <div className="search-container">
         <input
         type="text"
         placeholder="Search..."
        className="search-bar"
        />
    <button className="search-button"><FaSearch /></button>
  </div>
        <nav className="menu">
          <ul>
            <li className="menu-item active">Browse</li>
            <li className="menu-item">Trending</li>
            <li className="menu-item">
              <Link to="/connections-page" style={{textDecoration: 'none', color:'#000'}}>Connections</Link>
            </li>
            <li className="menu-item">Coming Soon</li>
            <li className="menu-item">Chat with Friends</li>
          </ul>
        </nav>
        <div className="footer">
          <div className="settings" onClick={handleLogout}>🔓 Logout</div>
          <div className="profile">👤 My Profile</div>
        </div>
      </aside>

      <main className="content">
        <div
          className="featured-movie"
          style={{ backgroundImage: 'url("/images/Background-hp.jpeg")' }}
        >
          <div className="movie-info">
            <h2 className="movie-title">GOOD FELLAS</h2>
            <p className="movie-description">
              The film follows Henry Hill (Ray Liotta) as he rises through the
              ranks of the Lucchese crime family, from errand boy to fence to major criminal. It also explores
              the relationships between Henry and his associates Jimmy Conway (Robert De Niro) and Tommy DeVito (Joe Pesci),
              as well as his marriage to Karen.
            </p>
            <div className="buttons">
              <button className="play-button">PLAY NOW</button>
              <button className="trailer-button">TRAILER</button>
            </div>
          </div>
        </div>

        <div className="movie-section">
          <h2>Similar Movie Suggestions</h2>
          <div className="suggestions">
            <div className="suggestion">
              <img src="/images/Movie2.jpeg" alt="The Godfather" />
              <p>The Godfather</p>
            </div>
            <div className="suggestion">
              <img src="/images/Movie3.jpeg" alt="Scarface" />
              <p>Scarface</p>
            </div>
            <div className="suggestion">
              <img src="/images/Movie1.jpeg" alt="Reservoir Dogs" />
              <p>Reservoir Dogs</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
