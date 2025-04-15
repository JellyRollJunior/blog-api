import { usePosts } from '../../hooks/usePosts.js';

const Homepage = () => {
  const posts = usePosts();

  return (
    <>
      <header>This is a header</header>
      <h1>Blog Name</h1>
      <main>
        {!posts && <div>loading</div>}
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
        {posts && posts.length == 0 && <div>No posts available</div>}
      </main>
    </>
  );
};

export { Homepage };
