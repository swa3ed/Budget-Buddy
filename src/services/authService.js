// authService.js

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export async function login(username, password) {
    const response = await fetch(`${apiBaseUrl}/users/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error('Failed to log in');
    }

    const data = await response.json();
    return data;
}
