# Project Name: Social Network API

## Description
This project is a RESTful API for a social network application. It allows users to create accounts, share their thoughts, add friends, and react to thoughts.

## Installation Instructions
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using the command `npm install`.
4. Set up a MongoDB database.
5. Configure environment variables (if any).
6. Start the server using the command `npm start`.

## Usage Instructions
- Use HTTP client software like Postman or curl to interact with the API endpoints.
- Refer to the API Routes section for available endpoints and their functionalities.

## API Routes

### User Routes
- **GET /api/users**: Get all users.
- **GET /api/users/:id**: Get a user by ID.
- **POST /api/users**: Create a new user.
- **PUT /api/users/:id**: Update a user by ID.
- **DELETE /api/users/:id**: Delete a user by ID.
- **POST /api/users/:userId/friends/:friendId**: Add a friend to a user's friend list.
- **DELETE /api/users/:userId/friends/:friendId**: Remove a friend from a user's friend list.

### Thought Routes
- **GET /api/thoughts**: Get all thoughts.
- **GET /api/thoughts/:id**: Get a thought by ID.
- **POST /api/thoughts**: Create a new thought.
- **PUT /api/thoughts/:id**: Update a thought by ID.
- **DELETE /api/thoughts/:id**: Delete a thought by ID.
- **POST /api/thoughts/:thoughtId/reactions**: Add a reaction to a thought.
- **DELETE /api/thoughts/:thoughtId/reactions/:reactionId**: Remove a reaction from a thought.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Validator

## License
This project is licensed under the MIT License.

## Contact Information
For any inquiries or issues, please contact Jayden Taylor at devmasterinbox@gmail.com.

