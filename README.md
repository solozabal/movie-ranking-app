# Movie Ranking App

## Overview
The Movie Ranking App is a web application that allows users to create personalized movie rankings using data from The Movie Database (TMDb) API. Users can search for movies, view detailed information, and rate their favorites. 
The application also supports user authentication and personalized lists.

## Features
- **Search for Movies**: Users can search for movies by title.
- **Movie Details**: View detailed information about each movie, including synopsis, cast, and ratings.
- **Rating System**: Users can rate movies using a star system.
- **Custom Filters**: Filter movies by genre, release year, popularity, and rating.
- **Personalized Lists**: Create custom lists such as "Watch Later" and "Favorites".
- **User Authentication**: Log in using Google accounts for a personalized experience.

## Tech Stack
- **Backend**: 
  - Language: JavaScript/TypeScript
  - Framework: Node.js with Express.js
  - Database: MongoDB (using Mongoose)
  - Authentication: Firebase Authentication (for Google login)
  - Security: Helmet.js for HTTP headers, JWT for user authentication

- **Frontend**: 
  - Language: JavaScript/TypeScript
  - Framework: React.js with Bootstrap

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Set up the database configuration in `src/config/dbConfig.ts`.
4. Start the server:
   ```
   npm start
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.