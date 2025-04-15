const SERVER_URL = 'http://localhost:3000';

const getRequest = async (endpoint, signal = null, headers = {}) => {
    try {
        const response = await fetch(`${SERVER_URL}${endpoint}`, {
            mode: 'cors',
            signal,
            headers,
        });
        if (!response.ok) {
            throw new Error(`HTTP error: status ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { getRequest };
