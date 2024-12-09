import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/WelcomePage.css'
import videoFile from "../assets/videos/large.mp4";

function WelcomePage() {
    const navigate = useNavigate();

    const redirect = () => {
        navigate("/signup-step1");
    };

    return (
        <div className="welcome-page-container">
            <video className="background-video" autoPlay muted loop>
                <source src={videoFile} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="welcome-page">
                <h1>WELCOME TO MOVIE MIND's.....</h1>
                <button onClick={redirect}>GET STARTED</button>
            </div>
            <div className="welcome-login">
                <h4>Already have an account?</h4>
                <a href="/login">Login Here</a>
            </div>
        </div>
    );
}

export default WelcomePage;
