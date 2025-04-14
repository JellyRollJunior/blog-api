# blog-api

#### Endpoints

| METHOD | URI                                | Function            |
| ------ | ---------------------------------- | ------------------- |
| POST   | /users                             | Create user         |
| POST   | /auth/login                        | Login user          |
| GET    | /posts                             | Get all posts       |
| POST   | /posts                             | Create post         |
| PUT    | /posts/:postId                     | Update post         |
| DELETE | /posts/:postId                     | Delete post         |
| GET    | /posts/:postId/comments            | Get post comments   |
| POST   | /posts/:postId/comments            | Create post comment |
| PUT    | /posts/:postId/comments/:commentId | Update post comment |
| DELETE | /posts/:postId/comments/:commentId | Delete post comment |
