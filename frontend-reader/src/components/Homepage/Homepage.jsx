import { usePosts } from '../../hooks/usePosts.js';
import { Link } from 'react-router-dom';
import styles from './Homepage.module.css';
import shared from '../../styles/shared.module.css';

const Homepage = () => {
  const { posts, error, loading } = usePosts();

  return (
    <>
      <header>
        <nav>
          <Link to='signin'>
            <button className={styles.signInButton}>Sign in</button>
          </Link>
        </nav>
        <h1>The Chiikawa Chronicle</h1>
        <p>なんか小さくてかわいいやつ</p>
      </header>
      <main>
        {loading && <h2>loading</h2>}
        {posts && posts.length > 0 && (
          <ul className={styles.postHolder}>
            <hr />
            {posts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content.slice(0, 80)}{post.content.length > 80 && '...'}</p>
                <p>By {post.author.username} • {post.publishTime}</p>
                <hr />
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
