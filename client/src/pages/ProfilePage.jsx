import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    preference1: '',
    preference2: '',
    preference3: '',
    socialLinks: '',
    website: 'https://www.godaddy.com/username',
    twitter: '@shelby_london',
    instagram: 'N/A',
    facebook: 'N/A',
  });
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const handleLogout = () => {
    fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userInfo');
          navigate('/login');
        } else {
          console.error('Failed to log out from server');
        }
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    // Validate required fields
    const { firstName, lastName, preference1, preference2, preference3, socialLinks } = formData;
    if (!firstName || !lastName || !preference1 || !preference2 || !preference3 || !socialLinks) {
      alert("Please fill out all the fields");
      return;
    }

    const payload = {
      email,
      ...formData, // Use formData directly
    };
    console.log('Payload:', payload);

    try {
      const response = await fetch('http://localhost:4000/profile', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Details updated successfully!!");
        setFormData({
          preference1: '',
          preference2: '',
          preference3: '',
          socialLinks: '',
          website: 'https://www.godaddy.com/username',
          twitter: '@shelby_london',
          instagram: 'N/A',
          facebook: 'N/A',
        });
      } else {
        alert("Failed to submit your responses.");
      }
    } catch (error) {
      console.error("Error updating responses:", error);
      alert("An error occurred while updating your responses");
    }
  };

  const deleteUserProfile = async () => {
    if (!email) {
      alert('Email is missing. Unable to delete user.');
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/profile', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        console.log('Deleted User:', data.deletedUser);
        localStorage.removeItem('authToken');
        localStorage.removeItem('email');
        navigate('/signup-step1');
      } else {
        const errorData = await response.json();
        alert(`Failed to delete user: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error deleting user profile:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const response = await fetch('http://localhost:4000/profile', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData((prev) => ({
            ...prev,
            firstName: data.firstName,
            lastName: data.lastName,
          }));
        } else if (response.status === 404) {
          console.error('User not found');
          alert('User not found');
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          className="profile-pic"
          src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
          alt="Profile"
        />
        <h2 className="profile-name">
          {formData.firstName} {formData.lastName}
        </h2>
        <p className="profile-title">Cinephile/Aspiring Screenwriter</p>
        <p className="profile-location">Arlington, Virginia, USA</p>
        <hr />
        <div className="profile-info">
          <p>
            <strong>Website:</strong>
            <span className="profile-detail">{formData.website}</span>
          </p>
          <hr className="info-separator" />
          <p>
            <strong>Twitter/X:</strong>
            <span className="profile-detail">{formData.twitter}</span>
          </p>
          <hr className="info-separator" />
          <p>
            <strong>Instagram:</strong>
            <span className="profile-detail">{formData.instagram}</span>
          </p>
          <hr className="info-separator" />
          <p>
            <strong>Facebook:</strong>
            <span className="profile-detail">{formData.facebook}</span>
          </p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
      <div className="profile-edit">
        <form>
          <div className="form-group-inline">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group-inline">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group-inline">
            <label htmlFor="preference1">Movie Preference 1:</label>
            <select
              id="preference1"
              name="preference1"
              value={formData.preference1}
              onChange={handleInputChange}
              required
            >
              <option value="" style={{ fontFamily: 'Aerial' }}>
                Select Preference 1
              </option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
            </select>
          </div>
          <div className="form-group-inline">
            <label htmlFor="preference2">Movie Preference 2:</label>
            <select
              id="preference2"
              name="preference2"
              value={formData.preference2}
              onChange={handleInputChange}
              required
            >
              <option value="" style={{ fontFamily: 'Aerial' }}>
                Select Preference 2
              </option>
              <option value="Horror">Horror</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
            </select>
          </div>
          <div className="form-group-inline">
            <label htmlFor="preference3">Movie Preference 3:</label>
            <select
              id="preference3"
              name="preference3"
              value={formData.preference3}
              onChange={handleInputChange}
              required
            >
              <option value="" style={{ fontFamily: 'Aerial' }}>
                Select Preference 3
              </option>
              <option value="Thriller">Thriller</option>
              <option value="Adventure">Adventure</option>
              <option value="Fantasy">Fantasy</option>
            </select>
          </div>
          <div className="form-group-inline">
            <label htmlFor="socialLinks">Social Media URL:</label>
            <input
              type="text"
              id="socialLinks"
              name="socialLinks"
              value={formData.socialLinks}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="button"
            className="save-button"
            onClick={handleSaveChanges}
          >
            UPDATE CHANGES
          </button>
        </form>
      </div>
      <div className="back-link">
        <Link to="/home-page">← Back to Browse</Link>
        <div className="delete-container">
          <h3>Need a fresh start?</h3>
          <button className="save-button" onClick={deleteUserProfile}>
            DELETE PROFILE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
