# Online Code Judge Platform

This is a full-stack web application designed to serve as an online code judge platform, allowing users to solve programming challenges to improve their skills. The project is built using React.js for the frontend, Node.js for the backend, and MongoDB for the database. The platform supports two user personas: regular users and administrators.

## Features

### For Users

- **Programming Challenges**: Users can access a variety of programming challenges across different difficulty levels.
- **Submission**: Users can submit their solutions to the challenges and receive feedback on their code's correctness and efficiency.

### For Admins

- **Question Creation**: Admins can create new programming challenges for users to solve, including specifying the problem statement, input/output format, and test cases.

## Project Structure

The project is organized into two main directories:

- **frontend**: Contains the React.js frontend code.
- **backend**: Contains the Node.js backend code.

### Frontend

The frontend is built using React.js and utilizes various libraries for UI components and state management. The directory structure is as follows:

- **src**
  - **components**: Contains reusable UI components.
  - **pages**: Contains different pages of the application, such as the homepage, challenge page, profile page, etc.
  - **utils**: Contains utility functions used across the application.
  - **App.js**: Main component responsible for routing and rendering other components.
  - **index.js**: Entry point of the application.

### Backend

The backend is built using Node.js and Express.js framework for handling HTTP requests. MongoDB is used as the database to store user information, challenges, submissions, etc. The directory structure is as follows:

- **src**
  - **controllers**: Contains route handlers for different API endpoints.
  - **models**: Defines MongoDB schemas for different data entities.
  - **middlewares**: Contains custom middleware functions for authentication, error handling, etc.
  - **index.js**: Entry point of the backend application.

## Getting Started

Follow these steps to set up and run the project locally:

1. Clone the repository: `git clone https://github.com/srishtiKap-dev/online-code-judge.git`
2. Navigate to the project directory: `cd online-code-judge`
3. Install dependencies for frontend and backend:
   - Frontend: `cd frontend && npm install`
   - Backend: `cd backend && npm install`
4. Set up MongoDB database:
   - Install MongoDB locally or use a cloud-hosted solution.
   - Configure the connection URI in the backend `.env` file.
5. Start the backend server: `cd backend && nodemon index.js`
6. Start the frontend development server: `cd frontend && yarn start`
7. Access the application in your browser at `http://localhost:3000`

## Acknowledgements

- Special thanks to Mentors at AlgoU for inspiration and reference.
