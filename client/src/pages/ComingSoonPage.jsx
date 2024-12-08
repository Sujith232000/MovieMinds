import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import '../styles/ComingSoonPage.css';
import { useUser } from '../contexts/UserContext';

const ComingSoonPage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const API_KEY = '0a9df2a7c19a7159901f6523aef5cc22';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const navigate = useNavigate();
  const {userDetails} = useUser();

  // Fetch Genres
  const fetchGenres = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
      const genreMap = {};
      response.data.genres.forEach((genre) => {
        genreMap[genre.id] = genre.name;
      });
      setGenres(genreMap);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  // Fetch Upcoming Movies
  const fetchComingSoonMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching coming soon movies:', error);
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

  // Search Functionality
  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      fetchComingSoonMovies(); // Reset to coming soon movies when search is cleared
      return;
    }
    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=en-US&page=1`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchComingSoonMovies();
  }, []);

  return (
    <div className="comingsoon-container">
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
            <li className="menu-item-home">
            <Link to="/home-page" style={{ textDecoration: 'none', color: '#000' }}>Browse</Link></li>
            <li className="menu-item-home">
            <Link to="/trending-page" style={{ textDecoration: 'none', color: '#000' }}>Trending</Link>
            </li>
            <li className="menu-item-home">
              <Link to="/connections-page" style={{ textDecoration: 'none', color: '#000' }}>Connections</Link>
            </li>
            <li className="menu-item active">
            <Link to="/coming-soon-page" style={{ textDecoration: 'none', color: '#93131B', fontSize:'x-large' }}>Coming Soon</Link>
            </li>
            <li className="menu-item-home" style={{ textDecoration: 'none', color: '#000' }}>Chat with Friends</li>
          </ul>
        </nav>
        <div className="footer">
          <div className="settings" onClick={handleLogout}>🔓 Logout</div>
          <div className="profile">👤 {userDetails?userDetails:"Guest"}</div>
        </div>
      </aside>
      <main className="comingsoon-content">
        <h2 className="comingsoon-title">Coming Soon Movies</h2>
        <div className="comingsoon-container-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="comingsoon-card">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-info-comingsoon">
                <p className="movie-title-comingsoon">{movie.title}</p>
                <p className="movie-genre-comingsoon">
                  {movie.genre_ids.map((id) => genres[id]).join(', ') || 'Unknown'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ComingSoonPage;
