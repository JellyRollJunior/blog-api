import { usePosts } from '../../hooks/usePosts.js';
import styles from './Homepage.module.css';

const Homepage = () => {
  const { posts, error, loading } = usePosts();

  return (
    <>
      <header>This is a header</header>
      <h1>Chiikawa's Blog</h1>
      <main>
        {loading && <h2>loading</h2>}
        {posts && posts.length > 0 && (
          <ul className={styles.articleHolder}>
            {posts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p>By {post.author} • {post.publishTime}</p>
                <hr />
              </li>
            ))}
          </ul>
        )}
        {posts && posts.length == 0 && <h2>No posts available</h2>}
        {error && <h2>An error occurred. Please try again.</h2>}
      </main>
    </>
  );
};

export { Homepage };
