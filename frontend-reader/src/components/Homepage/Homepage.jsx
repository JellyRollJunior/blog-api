import { useEffect, useState } from 'react';
import { getRequest } from '../../api/api';

const Homepage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchPosts = async () => {
      try {
        const data = await getRequest('/posts', controller.signal)
        setPosts(data);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Aborted');
          return;
        }
      }
    }

    fetchPosts();
    return () => controller.abort();
  }, []);

  return (
    <>
      <header>This is a header</header>
      <h1>Blog Name</h1>
      <main>
        <ul>
          {posts && posts.map((post) => {
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
