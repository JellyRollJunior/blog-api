import { useEffect, useState } from 'react';
import { getRequest } from '../api/api.js';
import { iso8061ToDate } from '../utils/jsonDateConvertor.js';

const usePosts = () => {
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // fetch posts data
    useEffect(() => {
        const controller = new AbortController();
        const fetchPosts = async () => {
            try {
                const data = await getRequest('/posts', controller.signal);
                data.map((post) => {
                    post.publishTime = iso8061ToDate(post.publishTime, 'MMMM do, yyy');
                });
                console.log(data);
                setPosts(data);
                setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();

        return () => controller.abort();
    }, []);

    return { posts, error, loading };
};

export { usePosts };
