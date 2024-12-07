import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/HomePage.css';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { useUser } from "../contexts/UserContext";

const HomePage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    return storedUserInfo ? JSON.parse(storedUserInfo) : {};
  });
  const [searchQuery, setSearchQuery] = useState('');
  const { email } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const API_KEY = '0a9df2a7c19a7159901f6523aef5cc22';
  const BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    const fetchUserInfo = async () => {
      const data = { email };
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:4000/home-page',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };
      try {
        const response = await axios.request(config);
        setUserInfo(response.data);
        localStorage.setItem('userInfo', JSON.stringify(response.data)); 
      } catch (error) {
        console.error('Error getting the data from database!!!', error);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();

    // Fetch user info only if it’s not already in localStorage
    if (!localStorage.getItem('userInfo')) {
      fetchUserInfo();
    }
  }, [email]);
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      return; // Ignore empty searches
    }
    try {
      const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=en-US&page=1`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  const handleLogout = () => {
    fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem('authToken'); // Clear the token from localStorage
          localStorage.removeItem('userInfo'); // Clear user info from localStorage
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <button className="search-button" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
        <nav className="menu">
          <ul>
            <li className="menu-item active">Browse</li>
            <li className="menu-item">Trending</li>
            <li className="menu-item">
              <Link to="/connections-page" style={{ textDecoration: 'none', color: '#000' }}>Connections</Link>
            </li>
            <li className="menu-item">Coming Soon</li>
            <li className="menu-item">Chat with Friends</li>
          </ul>
        </nav>
        <div className="footer">
          <div className="settings" onClick={handleLogout}>🔓 Logout</div>
          <div className="profile">👤 {userInfo.firstName ? userInfo.firstName : 'Guest'}</div>
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
          <h2>Popular Movie Suggestions</h2>
          <h2>Similar Movie Suggestions</h2>
          <div className="suggestions-container">
            {movies.map((movie) => (
              <div key={movie.id} className="suggestion">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  style={{ borderRadius: '10px' }}
                  style={{ borderRadius: '5px' }}
                />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
