import { usePosts } from '../../hooks/usePosts.js';
import { Link } from 'react-router-dom';
import styles from './Homepage.module.css';
import shared from '../../styles/shared.module.css';
import { Header } from '../Header/Header.jsx';
import { useUser } from '../../hooks/useUser.js';

const Homepage = () => {
  const user = useUser();
  const { posts, error, loading } = usePosts();

  return (
    <>
      <Header>
        {user && <h5>Hello, {user.username}</h5>}
        {!user && (
          <Link to="signin">
            <button className={shared.navButton}>Sign in</button>
          </Link>
        )}
      </Header>
      <main>
        {loading && <h2>loading</h2>}
        {posts && posts.length > 0 && (
          <ul className={styles.postHolder}>
            {posts.map((post) => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>
                  <h2 className={shared.marginTopXMedium}>{post.title}</h2>
                  <p className={shared.marginTopSmall}>
                    {post.content.slice(0, 80)}
                    {post.content.length > 80 && '...'}
                    <br />
                    By {post.author.username} • {post.publishTime}
                  </p>
                </Link>
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
