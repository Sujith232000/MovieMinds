# Movie Minds

**Movie Minds** is a web application that helps users explore trending and upcoming movies while connecting with others who share similar movie preferences. With personalized recommendations, social networking features, and a user-friendly interface, Movie Minds creates an engaging platform for movie enthusiasts.

---

## Features

### 1. Authentication
- Secure login and signup using **JWT (JSON Web Token)** for authentication.
- Two-step signup process:
  1. Provide basic details like name, email, and password.
  2. Enter movie preferences and social links for personalization.

---

### 2. Dynamic Pages
- **Welcome Page**: Engaging design featuring a video background and options to sign up or log in.
- **Browse Page**: Displays popular movies fetched from the **TMDB API**.
- **Trending Page**: Lists trending movies along with their ratings.
- **Coming Soon Page**: Highlights movies scheduled for upcoming release.
- **Profile Page**: Allows users to view, update, or delete their profiles.
- **Connection Page**: Matches users based on similar movie preferences with options to connect via social media.

---

### 3. Recommendation Engine
- **Powered by ML Algorithms**:
  - Uses **Cosine Similarity** to recommend movies based on user searches.
  - Features include:
    1. Suggesting movies similar to the one searched.
    2. Displaying detailed information about a movie.
    3. Browsing through a large movie collection.
  - Built using libraries like **Sklearn** and **NLTK**.

---

### 4. Architecture
- **Model-View-Controller (MVC) Pattern**:
  - **Model**: MongoDB for managing user profiles, preferences, and connections.
  - **View**: React.js for building dynamic and interactive user interfaces.
  - **Controller**: Express.js to handle backend logic and API connections.

---

### 5. Design Highlights
- **Custom CSS** for unique, user-friendly page designs.
- Flexible and responsive UI for desktop users, with plans for mobile optimization.

---

## Tools and Technologies
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **APIs**: TMDB API for fetching movie data
- **Authentication**: JWT for secure user login
- **Recommendation Engine**: Python libraries (Sklearn, NLTK) for ML algorithms

---

## Ethical Considerations
- **Data Privacy**:
  - Secure password encryption and token-based authentication.
  - Option for users to delete their profiles and data.
- **Bias Mitigation**:
  - Efforts to use diverse datasets and algorithms for unbiased recommendations.

---

## Future Enhancements
1. **Chat Feature**: Enable direct conversations between users about favorite movies.
2. **Group Functionality**: Create groups based on shared movie preferences.
3. **Improved Recommendations**: Expand dataset and refine algorithms for more diverse suggestions.
4. **Mobile Optimization**: Enhance accessibility on mobile devices.
5. **User Feedback Integration**: Allow users to rate recommendations for tailored results.

---

## Getting Started

### Prerequisites
- Node.js and npm installed.
- MongoDB server running locally or via a cloud provider.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/munavarhs/MovieMinds.git


## Use Case:

**User Registration**

1. **Preconditions**  
   - User must have access to the application.  
   - A valid email address is required.  

2. **Main Flow**  
   - User accesses the registration page and provides the required information: first name, last name, email, and password [S1].  
   - User sets their movie preferences and social media URL [S2].  
   - The system validates the input and registers the user [S3].  

3. **Subflows**  
   - [S1] User navigates to the signup page and enters their information in the provided fields.  
   - [S2] User selects movie preferences and provides a social media URL.  
   - [S3] System validates the input fields, saves the data, and confirms registration.  

4. **Alternative Flows**  
   - [E1] User provides an already registered email. The system displays an error message.

