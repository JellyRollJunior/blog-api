const SERVER_URL = 'http://localhost:3000';

const getRequest = async (endpoint, signal = null, headers = {}) => {
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
        mode: 'cors',
        signal,
        headers,
    });
    const json = await response.json();
    if (!response.ok) {
        const error = new Error(`${response.status}: ${json.error}`);
        error.code = response.status;
        throw error;
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
        const error = new Error(json.error);
        error.code = response.status;
        throw error;
    }
    return json;
}

const deleteRequest = async (endpoint, body, signal = null, headers = {}) => {
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
        mode: 'cors',
        method: 'DELETE',
        body: JSON.stringify(body),
        signal,
        headers,
    });
    const json = response.json();
    if (!response.ok) {
        const error = new Error(json.error);
        error.code = response.status;
        throw new error;
    }
    return json;
}

export { getRequest, postRequest, deleteRequest };
