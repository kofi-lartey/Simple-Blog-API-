 📝 Blog API
This is a simple blog backend API built with Node.js, Express, and MongoDB. It supports user registration, login, and CRUD operations for blog posts.

🚀 Setup Instructions
1. Install Dependencies
bash
Copy
Edit
npm install 
2. Environment Variables
Create a .env file in the root directory and add your MongoDB connection URI:
MONGODB details - Connection
MONGO_URI=mongodb+srv://kofilartey:Pleaseyou5@cluster0.g9eai0u.mongodb.net/blog_db?retryWrites=true&w=majority&appName=Cluster0
PORT=4060
JWT_SECRET=your_jwt_secret_here

3. Run the Server
npm start
The API should now be running on http://localhost:4060.

📚 API Documentation
All routes are prefixed with /api.

🔐 User Routes
1. Register
POST /api/register

Request Body:

json-format
{
  "username": "kofiLartey",
  "password": "1234567890"
}
Response:
{
  "message": "Successful registration"
}

2. Login
POST /api/login

Request Body:

json- format
{
  "username": "kofiLartey",
  "password": "1234567890"
}
Response:
{
  "message": "Token",
  "token": "JWT_TOKEN_HERE",
  "user": {
    "username": "kofiLartey",
    "password": "$2b$12$7onEjJ7zCUwIuOzjVKoEtOF7yFUR7wTCpbD.gpXIUfbdh2iS3Yqci",
    "id": "6863e6f59bda3ea34ae00065"
  }
}

📝 Post Routes
🔐 Requires JWT Token in Authorization header for protected routes.

1. Get All Posts
GET /api/posts

Response:
[
  {
    "_id": "postId1",
    "title": "First Post",
    "body": "This is a post",
    "user": "userID",
  }
]

2. Get a Single Post
GET /api/posts/:id
PostID - The post you want to see

3. Create a Post
POST /api/posts
(Protected)

Headers:
Authorization: Bearer <JWT_TOKEN>
Request Body:

json - format
{
  "title": "New Post",
  "body": "Post content"
  "user": "userID"
}

4. Update a Post
PUT /api/posts/:id
(Protected)
PostID - The post you want to edit
Request Body:

json-format
{
  "title": "Updated Title",
  "body": "Updated content"
}
5. Delete a Post
DELETE /api/posts/:id
PostID - The post you want to delete
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
A major challenge was restricting users from creating or modifying posts using another user's ID. This was resolved by extracting the authenticated user’s ID from the JWT and comparing it to the post’s user field during protected routes like PUT and DELETE but still cant solve that of the creating post.
