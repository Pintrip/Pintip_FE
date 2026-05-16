const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/backend';

export const api = {
    get: (path) =>
        fetch(`${API_BASE}${path}`, {
            headers: { Accept: 'application/json' },
        }).then((res) => res.json()),

    post: (path, body) =>
        fetch(`${API_BASE}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then((res) => res.json()),
};
