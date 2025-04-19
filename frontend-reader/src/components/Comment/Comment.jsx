import { useParams } from 'react-router-dom';
import { deleteRequest } from '../../api/api';
import styles from './Comment.module.css';
import { useState } from 'react';

const Comment = ({
  id,
  username,
  createdAt,
  content,
  user,
  setCommentError,
}) => {
  const postId = useParams().postId;
  const [comment, setComment] = useState(content);
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not logged in. Please login to delete comment.');
      }
      const json = await deleteRequest(`/posts/${postId}/comments/${id}`, null, null, {
          Authorization: `Bearer ${token}`,
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
  };

  return (
    <>
      <h3 className={styles.commenter}>
        <span className={styles.username}>{username}</span>
        <span className={styles.date}> • {createdAt}</span>
        {user && user.username == username && !showEdit && (
          <>
            <button className={styles.commentButton} onClick={() => setShowEdit(true)}>Edit</button>
            <button className={styles.commentButton} onClick={() => handleDelete(id)}>Delete</button>
          </>
        )}
      </h3>
      {!showEdit && <p>{content}</p>}
      {showEdit && (
        <form className={styles.commentForm}>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></textarea>
          <button type='button' onClick={() => setShowEdit(false)}>Cancel</button>
          <button>Edit</button>
        </form>
      )}
    </>
  );
};

export { Comment };
