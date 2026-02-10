export const fetchGoogleSheet = async (url: string): Promise<string> => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch Google Sheet');
    }

    return await response.text();
};
