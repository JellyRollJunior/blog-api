const SERVER_URL = 'http://localhost:3000';

const getRequest = async (endpoint, headers = {}) => {
    try {
        const response = await fetch(`${SERVER_URL}${endpoint}`, {
            mode: 'cors',
            headers: headers,
        });
        const json = await response.json();
        console.log(json)
        return json;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export { getRequest };
