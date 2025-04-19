import { useParams } from 'react-router-dom';
import { deleteRequest, putRequest } from '../../api/api';
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

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not logged in. Please login to delete comment.');
      }
      const json = await deleteRequest(
        `/posts/${postId}/comments/${id}`, 
        null, 
        null, 
        { Authorization: `Bearer ${token}` },
      );
      console.log(json);
      setCommentError(null);
      window.location.reload();
    } catch (error) {
      // if unauthorized error, delete expired token
      if (error.code == 401) {
        localStorage.removeItem('token');
        setCommentError('Please login to delete comment.');
      } else {
        setCommentError('Error deleting comment. Please try again later.');
      }
      console.log(error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (!token) {
        throw new Error('Not logged in. Please login to edit comment.');
      }
      const editedComment = await putRequest(
        `/posts/${postId}/comments/${id}`, 
        { content: comment },
        null,
        { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', },
      )
      console.log(editedComment);
      // close edit form, remove errors, set new comment
      setShowEdit(false);
      setCommentError(null);
      setComment(editedComment.content);
    } catch (error) {
      // if unauthorized error, delete expired token
      if (error.code == 401) {
        localStorage.removeItem('token');
        setCommentError('Please login to edit comment.');
      } else {
        setCommentError('Error editing comment. Please try again later.');
      }
      // hide edit comment form
      setShowEdit(false);
      console.log(error);
    }
  }

  return (
    <>
      <h3 className={styles.commenter}>
        <span className={styles.username}>{username}</span>
        <span className={styles.date}> • {createdAt}</span>
        {user && user.username == username && !showEdit && (
          <>
            <button className={styles.commentButton} onClick={() => setShowEdit(true)}>Edit</button>
            <button className={styles.commentButton} onClick={() => handleDelete()}>Delete</button>
          </>
        )}
      </h3>
      {!showEdit && <p>{comment}</p>}
      {showEdit && (
        <form className={styles.commentForm} onSubmit={handleEdit}>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></textarea>
          <button type='button' onClick={() => setShowEdit(false)}>Cancel</button>
          <button>Confirm</button>
        </form>
      )}
    </>
  );
};

export { Comment };
