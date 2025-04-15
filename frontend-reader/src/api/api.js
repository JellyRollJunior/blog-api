const SERVER_URL = 'http://localhost:3000';

const getRequest = async (endpoint, signal = null, headers = {}) => {
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
        mode: 'cors',
        signal,
        headers,
    });
    if (!response.ok) {
        throw new Error(`HTTP error: status ${response.status}`);
    }
    return response.json();
};

export { getRequest };
