import { Link, useParams } from 'react-router-dom';
import { Header } from '../Header/Header';
import { usePost } from '../../hooks/usePost';
import shared from '../../styles/shared.module.css';
import styles from './PostPage.module.css';

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
        <section>
          <h3 className={`${shared.marginTopXLarge} ${shared.fontSizeHeadingMedium}`}>Comments</h3>
          <hr />
          {post && post.comments.length > 0 && (
            <ul className={shared.zeroPadding}>
              {post.comments.map((comment) => (
                <li className={`${shared.marginTopSmall} ${styles.comment}`} key={comment.id}>
                  <h3 className={styles.commenter}>
                    <span className={styles.username}>{comment.commenter.username}</span>
                    <span className={styles.date}>  •  {comment.createdAt}</span>
                  </h3>
                  <p>{comment.content}</p>
                </li>
              ))}
            </ul>
          )}
          {post && post.comments.length == 0 && <h1>No comments!</h1>}
        </section>
      </main>
    </>
  );
};

export { PostPage };
