# Simple-Blog-API-
Simple Blog API to create,  read, update, and delete blog posts, and which includes a simple authentication mechanism for creating and  updating posts. 
📝 Blog API
This is a simple blog backend API built with Node.js, Express, and MongoDB. It supports user registration, login, and CRUD operations for blog posts.

🚀 Setup Instructions
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Install Dependencies
bash
Copy
Edit
npm install
3. Environment Variables
Create a .env file in the root directory and add your MongoDB connection URI:

env
Copy
Edit
MONGO_URI=mongodb+srv://kofilartey:Pleaseyou5@cluster0.g9eai0u.mongodb.net/blog_db?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=your_jwt_secret_here
⚠️ Never share your .env file or sensitive credentials in public repositories.

4. Run the Server
bash
Copy
Edit
npm start
The API should now be running on http://localhost:5000.

📚 API Documentation
All routes are prefixed with /api.

🔐 User Routes
1. Register
POST /api/register

Request Body:

json
Copy
Edit
{
  "username": "kofiLartey",
  "password": "1234567890"
}
Response:

json
Copy
Edit
{
  "success": true,
  "message": "User registered successfully"
}
2. Login
POST /api/login

Request Body:

json
Copy
Edit
{
  "username": "kofiLartey",
  "password": "1234567890"
}
Response:

json
Copy
Edit
{
  "token": "JWT_TOKEN_HERE"
}
📝 Post Routes
🔐 Requires JWT Token in Authorization header for protected routes.

1. Get All Posts
GET /api/posts

Response:

json
Copy
Edit
[
  {
    "_id": "postId1",
    "title": "First Post",
    "body": "This is a post",
    "user": "userId"
  }
]
2. Get a Single Post
GET /api/posts/:id

3. Create a Post
POST /api/posts
(Protected)

Headers:

makefile
Copy
Edit
Authorization: Bearer <JWT_TOKEN>
Request Body:

json
Copy
Edit
{
  "title": "New Post",
  "body": "Post content"
}
4. Update a Post
PUT /api/posts/:id
(Protected)

Request Body:

json
Copy
Edit
{
  "title": "Updated Title",
  "body": "Updated content"
}
5. Delete a Post
DELETE /api/posts/:id
(Protected)

✅ Assumptions Made
Only unique usernames can register (enforced by additional validation).

Posts can only be created, updated, or deleted by authenticated users.

JWT is used to securely verify and authorize user actions.

Post data includes a reference to the user who created it.

⚠️ Challenges Faced
Restricting Duplicate Users:
Initially, the same username could register multiple times. This was fixed by checking for existing usernames before registration.

Post Ownership Security:
A major challenge was restricting users from creating or modifying posts using another user's ID. This was resolved by extracting the authenticated user’s ID from the JWT and comparing it to the post’s user field during protected routes like PUT and DELETE.
