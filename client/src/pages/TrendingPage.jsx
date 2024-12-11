import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/HomePage.css';
import '../styles/TrendingPage.css';
import { useUser } from '../contexts/UserContext';

const TrendingPage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const API_KEY = '0a9df2a7c19a7159901f6523aef5cc22';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const navigate = useNavigate();
  const { userDetails } = useUser();

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

  // Fetch Trending Movies
  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  };

  // Search Functionality
  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      fetchTrendingMovies(); // Reset to trending movies when search is cleared
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

  const handleClick = () =>{
    navigate('/profile');
  }

  useEffect(() => {
    fetchGenres();
    fetchTrendingMovies();
  }, []);

  return (
    <div className="trendingpage-container">
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
            <li className="menu-item active">
              <Link to="/trending-page" style={{ textDecoration: 'none', color: '#93131B', fontSize: 'x-large' }}>Trending</Link>
            </li>
            <li className="menu-item-home">
              <Link to="/connections-page" style={{ textDecoration: 'none', color: '#000' }}>Connections</Link>
            </li>
            <li className="menu-item-home">
              <Link to="/coming-soon-page" style={{ textDecoration: 'none', color: '#000' }}>Coming Soon</Link>
            </li>
            <li className="menu-item-home" style={{ textDecoration: 'none', color: '#000' }}>Chat with Friends</li>
            <li className="menu-item-home">
              <a
                href="http://localhost:8501"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: '#000' }}
              >
                Recommendation Engine
              </a>
            </li>
          </ul>
        </nav>
        <div className="footer">
          <div className="settings" onClick={handleLogout}>🔓 Logout</div>
          <div className="profile" onClick={handleClick}>👤 {userDetails ? userDetails : "Guest"}'s Profile</div>
        </div>
      </aside>
      <main className="content-trending">
        <h2 className="trending-title">Trending Movies</h2>
        <div className="trending-container">
          {movies.map((movie) => (
            <div key={movie.id} className="trending-card">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-info-trending">
                <p className="movie-title-trending">{movie.title}</p>
                <p className="movie-genre">
                  {movie.genre_ids.map((id) => genres[id]).join(', ') || 'Unknown'}
                </p>
                <span className="rating-badge">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TrendingPage;
