import { usePosts } from '../../hooks/usePosts.js';

const Homepage = () => {
  const posts = usePosts();

  return (
    <>
      <header>This is a header</header>
      <h1>Blog Name</h1>
      <main>
        <ul>
          {posts && posts.map((post) => (
            <li>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <h3>By {post.author}</h3>
              <hr />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export { Homepage };
