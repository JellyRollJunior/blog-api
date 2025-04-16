import { usePosts } from '../../hooks/usePosts.js';
import { Link } from 'react-router-dom';
import styles from './Homepage.module.css';
import shared from '../../styles/shared.module.css';
import { Header } from '../Header/Header.jsx';
import { useEffect, useState } from 'react';
import { getRequest } from '../../api/api.js';

const Homepage = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // if token exists, fetch user data
    const token = localStorage.getItem('token');
    const abortController = new AbortController();

    if (token) {
      getRequest('/users', abortController.signal, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      })
        .then((user) => setUser(user))
        .catch((error) => {
          // if unauthorized error, delete expired token
          if (error.code == 401) {
            localStorage.removeItem('token');
            return null;
          }
        });
    }

    return () => abortController.abort();
  }, []);

  const { posts, error, loading } = usePosts();

  return (
    <>
      {user && <div>{user.username}</div>}
      <Header>
        <Link to="signin">
          <button className={shared.navButton}>Sign in</button>
        </Link>
      </Header>
      <main>
        {loading && <h2>loading</h2>}
        {posts && posts.length > 0 && (
          <ul className={styles.postHolder}>
            {posts.map((post) => (
              <li key={post.id}>
                <h2 className={shared.marginTopXMedium}>{post.title}</h2>
                <p className={shared.marginTopSmall}>
                  {post.content.slice(0, 80)}
                  {post.content.length > 80 && '...'}
                </p>
                <p>
                  By {post.author.username} • {post.publishTime}
                </p>
                <hr className={shared.marginTopXMedium} />
              </li>
            ))}
          </ul>
        )}
        {posts && posts.length == 0 && <h2>No posts available</h2>}
        {error && <h2 className={shared.error}>{error}</h2>}
      </main>
    </>
  );
};

export { Homepage };
