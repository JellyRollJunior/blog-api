import { Link, useParams } from 'react-router-dom';
import { usePost } from '../../hooks/usePost';
import { Header } from '../Header/Header';
import { CommentSection } from '../CommentSection/CommentSection';
import shared from '../../styles/shared.module.css';

const PostPage = () => {
  const postId = useParams().postId;
  const { post, error, loading } = usePost(postId);

  return (
    <>
      <Header>
        <Link to="/">
          <button className={shared.navButton}>Main</button>
        </Link>
      </Header>
      <main>
        {loading && <h2>loading</h2>}
        {error && <h2 className={shared.error}>{error.message}</h2>}
        <section className={shared.marginTopSmall}>
          {post && (
            <>
              <h2 className={shared.fontSizeHeadingLarge}>{post.title}</h2>
              <h4>By {post.author.username} • {post.publishTime}</h4>
              <p className={shared.marginTopLarge}>{post.content}</p>
            </>
          )}
        </section>
        <CommentSection post={post} />
      </main>
    </>
  );
};

export { PostPage };
