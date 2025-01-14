# Movie Ranking App - Backend

## Overview
The Movie Ranking App is a web application that allows users to create personalized movie rankings using data from The Movie Database (TMDb). This backend service is built with Node.js and Express.js, providing a RESTful API for the frontend application.

## Features
- **Search for Movies**: Users can search for movies by title.
- **Movie Details**: Detailed information about each movie, including synopsis, cast, and ratings.
- **User Ratings**: Users can rate movies and contribute to the overall ranking.
- **Custom Lists**: Users can create their own lists of movies, such as "Favorites" or "Watch Later".
- **Filters**: Filter movies by genre, release year, popularity, and ratings.

## Technologies Used
- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing user data and movie ratings.
- **Mongoose**: ODM for MongoDB to manage data models.
- **Firebase Authentication**: For user authentication, including Google login.
- **Helmet.js**: Middleware for securing HTTP headers.
- **JSON Web Tokens (JWT)**: For user authentication and session management.

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/movie-ranking-app.git
   cd movie-ranking-app/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Database**
   - Update the database configuration in `src/config/dbConfig.ts` with your MongoDB connection string.

4. **Run the Application**
   ```bash
   npm start
   ```

5. **API Documentation**
   - The API endpoints are defined in `src/routes/movieRoutes.ts`. Refer to this file for available routes and their usage.

## Security Considerations
- Always validate and sanitize user inputs to prevent injection attacks.
- Use HTTPS in production to secure data in transit.
- Implement proper error handling to avoid exposing sensitive information.

## Contribution
Feel free to contribute to this project by submitting issues or pull requests. Your feedback and contributions are welcome!