import { Link, useParams } from 'react-router-dom';
import { Header } from '../Header/Header';
import { usePost } from '../../hooks/usePost';
import shared from '../../styles/shared.module.css';
import styles from './PostPage.module.css';
import { useState } from 'react';
import { deleteRequest, postRequest } from '../../api/api';
import { useUser } from '../../hooks/useUser';

const PostPage = () => {
  const postId = useParams().postId;
  const user = useUser();
  const { post, error, loading } = usePost(postId);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not logged in. Please login to comment.');
      }
      const body = { content: comment };
      const newComment = await postRequest(`/posts/${postId}/comments`, body, null, {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      console.log(newComment);
      setCommentError(null);
      window.location.reload();
    } catch (error) {
      // if unauthorized error, delete expired token
      if (error.code == 401) {
        localStorage.removeItem('token');
      }
      setCommentError('Error creating comment. Please try again later');
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not logged in. Please login to delete comment.');
      }
      const json = await deleteRequest(`/posts/${postId}/comments/${id}`, null, null, { 
        'Authorization': `Bearer ${token}` 
      });
      console.log(json);
      setCommentError(null);
      window.location.reload();
    } catch (error) {
      // if unauthorized error, delete expired token
      if (error.code == 401) {
        localStorage.removeItem('token');
      }
      setCommentError('Error deleting comment. Please try again later');
      console.log(error);
    }
  }

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
                    {user && user.username == comment.commenter.username && (
                      <button className={styles.deleteButton} onClick={() => handleDelete(comment.id)}>Delete</button>
                    )}
                  </h3>
                  <p>{comment.content}</p>
                </li>
              ))}
            </ul>
          )}
          {post && post.comments.length == 0 && (
            <h3 className={shared.marginTopMedium}>No comments availble. Start the discussion!</h3>
          )}
        </section>
        <section className={shared.marginTopXMedium}>
          {localStorage.getItem('token') && (
            <>
              {commentError && <h4 className={shared.error}>{commentError}</h4>}
              <form className={styles.commentForm} onSubmit={handleSubmit}>
                <textarea 
                  value={comment} 
                  onChange={(event) => setComment(event.target.value)} 
                  placeholder='Add a comment'
                  ></textarea>
                <button>Reply</button>
              </form>
            </>
          )}
          {!localStorage.getItem('token') && (
            <h3 className={shared.centerAlign}>Sign in to leave a comment!</h3>
          )}
        </section>
      </main>
    </>
  );
};

export { PostPage };
