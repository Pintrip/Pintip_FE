const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/backend';

const getStoredSessionId = () =>
    localStorage.getItem('sessionId') || localStorage.getItem('tripSessionId');

const buildUrl = (path) => {
    const normalizedBase = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${normalizedBase}${normalizedPath}`;
};

const buildHeaders = (additionalHeaders = {}) => {
    const headers = {
        Accept: 'application/json',
        ...additionalHeaders,
    };

    const sessionId = getStoredSessionId();
    if (sessionId) {
        headers['X-Session-Id'] = sessionId;
    }

    return headers;
};

export const api = {
    get: (path) =>
        fetch(buildUrl(path), {
            headers: buildHeaders(),
        }).then((res) => res.json()),

    post: (path, body) =>
        fetch(buildUrl(path), {
            method: 'POST',
            headers: buildHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(body),
        }).then((res) => res.json()),

    put: (path, body) =>
        fetch(buildUrl(path), {
            method: 'PUT',
            headers: buildHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(body),
        }).then((res) => res.json()),
};
