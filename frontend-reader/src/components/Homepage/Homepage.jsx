import { usePosts } from '../../hooks/usePosts.js';
import { ArticlePreview } from '../ArticlePreview/ArticlePreview.jsx';

const Homepage = () => {
  const posts = usePosts();

  return (
    <>
      <header>This is a header</header>
      <h1>Blog Name</h1>
      <main>
        <ul>
          {posts && posts.map((post) =>
            <ArticlePreview post={post} />
          )}
        </ul>
      </main>
    </>
  );
};

export { Homepage };
