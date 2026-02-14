/*
import { User } from "../types/user";
import { Student } from "../types/student";
import { Drive } from "../types/drive";
*/
// src/services/apiService.ts

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Central API service
 * All real backend calls are handled here
 * Mock data completely removed
 */
const authHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiService = {
    // ---------------- STUDENTS ----------------

    getStudents: async () => {
        const response = await fetch(`${BASE_URL}/api/students`, {
            headers: {
                'Content-Type': 'application/json',
                ...authHeader(),
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch students');
        }

        return response.json();
    },

    addStudent: async (student: {
        rollNo: string;
        name: string;
        email: string;
        department: string;
        cgpa: number;
        backlogs?: number;
        missedDrives?: number;
        status?: string;
    }) => {
        const response = await fetch(`${BASE_URL}/api/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authHeader(),
            },
            body: JSON.stringify(student),
        });

        if (!response.ok) {
            throw new Error('Failed to add student');
        }

        return response.json();
    },

    // ---------------- DRIVES ----------------

    getDrives: async () => {
        const response = await fetch(`${BASE_URL}/api/drives`, {
            headers: {
                'Content-Type': 'application/json',
                ...authHeader(),
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch drives');
        }

        return response.json();
    },

    addDrive: async (drive: {
        companyName: string;
        role: string;
        packageLPA: number;
        date: string;
        eligibilityCgpa: number;
        eligibleBranches: string[];
        status?: string;
        description?: string;
    }) => {
        const response = await fetch(`${BASE_URL}/api/drives`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authHeader(),
            },
            body: JSON.stringify(drive),
        });

        if (!response.ok) {
            throw new Error('Failed to add drive');
        }

        return response.json();
    },

    uploadStudentsExcel: async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/import/students`,
            {
                method: 'POST',
                headers: { ...authHeader() },
                body: formData,
            }
        );

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Excel upload failed');
        }

        return res.json(); // { message, count }
    },
/*
    importFromGoogleSheet: async (sheetUrl: string) => {
        const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/import/google-sheet/students`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeader() },
                body: JSON.stringify({ url: sheetUrl }),
            }
        );

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Google Sheet import failed');
        }

        return res.json(); // { message, count }
    },*/
    importFromGoogleSheet: async (sheetUrl: string) => {

        // 1️⃣ Extract sheet ID
        const match = sheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (!match) throw new Error("Invalid Google Sheet URL");

        const sheetId = match[1];

        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

        // 2️⃣ Fetch CSV in browser (Google allows this)
        const csvResponse = await fetch(csvUrl);
        const csvText = await csvResponse.text();

        if (csvText.startsWith('<!DOCTYPE')) {
            throw new Error("Sheet is not public. Make it public → Anyone with link (Viewer)");
        }

        // 3️⃣ Send CSV text to backend
        const res = await fetch(`${BASE_URL}/api/import/google-sheet/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authHeader(),
            },
            body: JSON.stringify({ csvText }),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Google Sheet import failed');
        }

        return res.json();
    },
};



/*
export const apiService = {
    login: async (email: string): Promise<User | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = MOCK_USERS.find(u => u.email === email);
                resolve(user);
            }, 800);
        });
    },

    getStudents: async (): Promise<Student[]> => {
        return new Promise(resolve => setTimeout(() => resolve([...MOCK_STUDENTS]), 500));
    },

    getDrives: async (): Promise<Drive[]> => {
        return new Promise(resolve => setTimeout(() => resolve([...MOCK_DRIVES]), 500));
    },

    addDrive: async (drive: Drive): Promise<Drive> => {
        return new Promise(resolve => {
            MOCK_DRIVES.push(drive);
            setTimeout(() => resolve(drive), 500);
        });
    },

    addStudent: async (student: Student): Promise<Student> => {
        return new Promise(resolve => {
            MOCK_STUDENTS.push(student);
            setTimeout(() => resolve(student), 500);
        });
    }
};
*/