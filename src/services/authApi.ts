const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginApi = async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error('Invalid credentials');
    }

    return res.json(); // { token, user }
};
