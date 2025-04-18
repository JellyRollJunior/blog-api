import { Link, useParams } from 'react-router-dom';
import { Header } from '../Header/Header';
import shared from '../../styles/shared.module.css';
import { useEffect, useState } from 'react';
import { getRequest } from '../../api/api';
import { format } from 'date-fns';

const PostPage = () => {
  const postId = useParams().postId;

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPost = async () => {
      setLoading(true);
      try {
        const post = await getRequest(`/posts/${postId}`, controller.signal);
        console.log(post);
        const date = new Date(post.publishTime);
        post.publishTime = format(date, 'MMMM do, yyy');
        setPost(post);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    return () => controller.abort();
  }, [postId]);

  return (
    <>
      <Header>
        <Link to="/">
          <button className={shared.navButton}>Main</button>
        </Link>
      </Header>
      <main>
        <h1>hi guys its the post page!</h1>
      </main>
    </>
  );
};

export { PostPage };
