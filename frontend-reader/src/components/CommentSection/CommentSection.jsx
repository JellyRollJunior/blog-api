import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser.js';
import { postRequest } from '../../api/api';
import { Comment } from '../Comment/Comment.jsx';
import shared from '../../styles/shared.module.css';
import styles from './CommentSection.module.css';

const CommentSection = ({post}) => {
  const postId = useParams().postId;
  const user = useUser();
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

  return (
    <>
      <section>
        <h3 className={`${shared.marginTopXLarge} ${shared.fontSizeHeadingMedium}`}>Comments</h3>
        <hr />
        {post && post.comments.length > 0 && (
          <ul className={shared.zeroPadding}>
            {post.comments.map((comment) => (
              <li className={`${shared.marginTopSmall} ${styles.comment}`} key={comment.id}>
                <Comment 
                  id={comment.id} 
                  username={comment.commenter.username} 
                  createdAt={comment.createdAt} 
                  content={comment.content} 
                  user={user} 
                  setCommentError={setCommentError} 
                />
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
    </>
  );
};

export { CommentSection };