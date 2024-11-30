import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <div className="header">
      <h1 className="login-logo" style={{color:'white', fontFamily:'math'}}>MOVIE MiND's</h1>
    </div>
  );
};

export default Header;
