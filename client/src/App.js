import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignupStep1 from './pages/SignupStep1';
import SignupStep2 from './pages/SignupStep2';
import HomePage from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import ForgotPassword from './pages/ForgotPassword';
import { UserProvider } from "../src/contexts/UserContext";
import ProtectedRoute from './components/ProtectedRoute';
import ConnectPage from './pages/ConnectPage';
import TrendingPage from './pages/TrendingPage';
import ComingSoonPage from './pages/ComingSoonPage';

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup-step1" element={<SignupStep1 />} />
        <Route path="/signup-step2" element={<SignupStep2 />} />
        <Route path="/home-page" element={
          <ProtectedRoute>
            <HomePage />
            </ProtectedRoute>
        } />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/connections-page" element={
          <ProtectedRoute>
          <ConnectPage />
          </ProtectedRoute>
          } />
        <Route path="/trending-page" element={
          <ProtectedRoute>
            <TrendingPage/>
          </ProtectedRoute>
        } />
        <Route path="/coming-soon-page" element={
          <ProtectedRoute>
            <ComingSoonPage/>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;

