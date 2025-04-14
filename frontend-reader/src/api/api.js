const SERVER_URL = 'http://localhost:3000';

const getRequest = async (endpoint, errorMessage, headers = {}) => {
    try {
        const response = await fetch(`${SERVER_URL}${endpoint}`, {
            mode: 'cors',
            headers: headers,
        });
        if (!response.ok) {
            throw new Error(errorMessage);
        }
        const json = await response.json();
        console.log(json)
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { getRequest };
