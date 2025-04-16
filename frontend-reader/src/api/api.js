const SERVER_URL = 'http://localhost:3000';

const getRequest = async (endpoint, signal = null, headers = {}) => {
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
        mode: 'cors',
        signal,
        headers,
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(`${response.status}: ${json.error}`);
    }
    return json;
};

const postRequest = async (endpoint, body, signal = null, headers = {}) => {
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(body),
        signal,
        headers,
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(`${json.error}`);
    }
    return json;
}

export { getRequest, postRequest };
