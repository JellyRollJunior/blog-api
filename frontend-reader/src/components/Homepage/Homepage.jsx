import { usePosts } from '../../hooks/usePosts.js';
import { Link } from 'react-router-dom';
import styles from './Homepage.module.css';
import shared from '../../styles/shared.module.css';
import { Header } from '../Header/Header.jsx';

const Homepage = () => {
  const { posts, error, loading } = usePosts();

  return (
    <>
      <Header>
        <Link to='signin'>
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
                <p className={shared.marginTopSmall}>{post.content.slice(0, 80)}{post.content.length > 80 && '...'}</p>
                <p>By {post.author.username} • {post.publishTime}</p>
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
