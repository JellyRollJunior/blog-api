import { useEffect, useState } from 'react';
import { getRequest } from '../api/api';
import { iso8061ToDate } from '../utils/jsonDateConvertor';

const usePost = (postId = 1) => {
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const fetchPost = async () => {
            setLoading(true);
            try {
                const post = await getRequest(
                    `/posts/${postId}`,
                    controller.signal
                );
                console.log(post);
                // convert date data
                post.publishTime = iso8061ToDate(post.publishTime, 'MMMM do, yyy');
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

    return { post, error, loading };
};

export { usePost };
