import { usePosts } from '../../hooks/usePosts.js';

const Homepage = () => {
  const {posts, loading, error} = usePosts();

  return (
    <>
      <header>This is a header</header>
      <h1>Blog Name</h1>
      <main>
        {loading && <h2>loading</h2>}
        {posts && posts.length > 0 && (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <h3>By {post.author}</h3>
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
