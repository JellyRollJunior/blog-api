import { useEffect, useState } from 'react';
import { getRequest } from '../api/api.js';

const usePosts = () => {
    const [posts, setPosts] = useState([]);

    // fetch post data
    useEffect(() => {
        const controller = new AbortController();
        const fetchPosts = async () => {
            try {
                const data = await getRequest('/posts', controller.signal);
                setPosts(data);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Aborted');
                    return;
                }
            }
        };
        
        fetchPosts();
        
        return () => controller.abort();
    }, []);

    return posts;
};

export { usePosts };
