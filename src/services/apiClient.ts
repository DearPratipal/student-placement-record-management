const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const apiClient = async (
    endpoint: string,
    options: RequestInit = {}
) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error('API request failed');
    }

    return response.json();
};
