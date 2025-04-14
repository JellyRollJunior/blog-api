# blog-api

### Description


```bash
# Start backend server
cd backend
node app.js
```

### Structure
- Server in "backend" folder
- Reader site in "frontend-reader" folder
- Admin site in "frontend-author" folder

### Stack

-   NodeJS, Express
-   Prisma ORM, PostgreSQL
-   Notable libraries:
    - Jsonwebtoken & passport jwt: (authorization)
    - bcryptjs (hashing passwords)
    - express validator (validating server data)
    - cors (enable cross origin resource sharing)

### Endpoints

| METHOD | URI                                | Function            | Notes       |
| ------ | ---------------------------------- | ------------------- | ----------- |
| POST   | /users                             | Create user         |             |
| POST   | /auth/login                        | Login user          | Returns JWT |
| GET    | /posts                             | Get published posts |             |
| GET    | /posts/admin                       | Get all posts       |             |
| POST   | /posts                             | Create post         |             |
| PUT    | /posts/:postId                     | Update post         |             |
| DELETE | /posts/:postId                     | Delete post         |             |
| GET    | /posts/:postId/comments            | Get post comments   |             |
| POST   | /posts/:postId/comments            | Create post comment |             |
| PUT    | /posts/:postId/comments/:commentId | Update post comment |             |
| DELETE | /posts/:postId/comments/:commentId | Delete post comment |             |

### Learning Outcomes
- Separating frontend and backend code (Jamstack)!
- More complex prisma queries (nested queries)
- Sending relevant error codes/messages instead of default 500 server error

### Retrospective aka yapping
- I quite like separating the frontend and backend. Previously, I found rendering views from the server side a bit cumbersome. 

### Acknowledgements