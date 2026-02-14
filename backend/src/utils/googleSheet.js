// backend/src/utils/googleSheet.js
/*
export const convertToCsvUrl = (url) => {
    try {
        const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (!match) {
            throw new Error('Invalid Google Sheet URL');
        }

        const sheetId = match[1];

        // If gid exists in URL use it, otherwise default to 0
        const gidMatch = url.match(/gid=([0-9]+)/);
        const gid = gidMatch ? gidMatch[1] : '0';

        return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
    } catch (err) {
        throw new Error('Invalid Google Sheet URL');
    }
};
*/
export const convertToCsvUrl = (url) => {
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (!match) throw new Error('Invalid Google Sheet URL');

    const sheetId = match[1];

    const gidMatch = url.match(/gid=([0-9]+)/);
    const gid = gidMatch ? gidMatch[1] : '0';

    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
};
