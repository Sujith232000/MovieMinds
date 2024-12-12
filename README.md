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
   ```
   
2. Download the files from the following link: [Google Drive](https://drive.google.com/drive/folders/1gl5XT3mia9c0Z4LcUVBGKIbnDM2YwbJb?usp=sharing)

3. Create a folder named `Files` in the same path where `client` and `server` exist, and copy the `.pkl` files from the downloaded folder into it.

4. Update your `Login.css` file as needed. Use the reference image below for guidance:

![Login Changes](assets/login-changes.png)

5. Update your `SignupStep1.css` file as needed. Use the reference image below for guidance:

![Signup Changes](assets/signup-changes.png)

6. Download the video from [this link](https://drive.google.com/drive/folders/1eDc7IMysbFYVFVmp15YAYDGAwcSV5lO4?usp=sharing) and paste it into the `client/src/assets/videos` folder.

7. Start the client by running the following command:

```bash
npm start
```

8. Start the server by running the following command:

```bash
nodemon index.js
```

9. Start the recommendation engine by running the following command:

```bash
streamlit run MovieMinds.py
```

## Use Case:

1. **User Registration**

1.1 **Preconditions**  
   - User must have access to the application.  
   - A valid email address is required.  

1.2 **Main Flow**  
   - User accesses the registration page and provides the required information: first name, last name, email, and password [S1].  
   - User sets their movie preferences and social media URL [S2].  
   - The system validates the input and registers the user [S3].  

1.3 **Subflows**  
   - [S1] User navigates to the signup page and enters their information in the provided fields.  
   - [S2] User selects movie preferences and provides a social media URL.  
   - [S3] System validates the input fields, saves the data, and confirms registration.  

1.4 **Alternative Flows**  
   - [E1] User provides an already registered email. The system displays an error message.

2. **User Login**

2.1 **Preconditions**  
   - User must be registered in the system with a valid email and password.  
   - The application must be running and accessible.  

2.2 **Main Flow**  
   - User navigates to the login page and enters their email and password [S1].  
   - The system validates the credentials [S2].  
   - Upon successful validation, the user is granted access to their dashboard [S3].  

2.3 **Subflows**  
   - [S1] User enters their registered email and password into the login form.  
   - [S2] System checks the entered credentials against the stored database records.  
   - [S3] System redirects the user to their dashboard with a welcome message.  

2.4 **Alternative Flows**  
   - [E1] User enters incorrect credentials. The system displays an error message.

3. **Movie Exploration**  
   Users can browse through a variety of movies, including trending and upcoming releases, to discover their next favorite movie.

4. **Movie Recommendations**  
   The system provides tailored movie recommendations based on user preferences, content, genres, production companies, keywords, and cast.

5. **Social Connections**  
   Users can connect with others who share similar movie interests, creating a community for movie discussions.

6. **Profile Management**  
   Users can view and manage their profiles, updating preferences as needed to refine recommendations.

7. **Detailed Movie Information**  
   Users can access detailed descriptions of movies, including cast, synopsis, and other relevant details.

8. **Insights into Upcoming Releases**  
   Stay informed about movies that are soon to be released with the "Coming Soon" page.

9. **Trending Movies**  
   Quickly identify trending movies to stay up-to-date with popular choices.

10. **Interactive UI**  
    Enjoy a user-friendly interface with smooth navigation and visually appealing design, ensuring an enjoyable experience.


