import { useEffect, useState } from 'react';
import { getRequest } from '../../api/api';

const Homepage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getRequest('/posts')
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <header>This is a header</header>
      <h1>Blog Name</h1>
      <main>
        <ul>
          {posts.map((post) => {
            return (
              <li>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <hr />
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export { Homepage };
