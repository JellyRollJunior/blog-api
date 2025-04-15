import { useEffect, useState } from 'react';
import { getRequest } from '../api/api.js';
import { format } from 'date-fns';

const usePosts = () => {
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // fetch post data
    useEffect(() => {
        const controller = new AbortController();
        const fetchPosts = async () => {
            try {
                const data = await getRequest('/posts', controller.signal);
                data.map((post) => {
                    const date = new Date(post.publishTime);
                    post.publishTime = format(date, 'MMMM do, yyy');
                })
                console.log(data);
                setPosts(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchPosts();
        
        return () => controller.abort();
    }, []);

    return { posts, error, loading};
};

export { usePosts };
