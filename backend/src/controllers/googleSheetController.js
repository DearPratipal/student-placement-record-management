import Student from '../models/Student.js';
import { parse } from 'csv-parse/sync';

export const importFromGoogleSheet = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ message: 'Sheet URL required' });
        }

        const response = await fetch(url);
        const csvText = await response.text();

        // ✅ Proper CSV parsing
        const records = parse(csvText, {
            columns: true,        // use header row
            skip_empty_lines: true,
            trim: true,
        });

        const students = records.map((row) => ({
            rollNo: row.rollNo,
            name: row.name,
            email: row.email,
            department: row.department,
            cgpa: Number(row.cgpa),
            backlogs: Number(row.backlogs || 0),
            missedDrives: Number(row.missedDrives || 0),
            status: row.status || 'ACTIVE',
        }));

        await Student.insertMany(students, { ordered: false });

        res.json({
            message: 'Students imported from Google Sheet successfully',
            count: students.length,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
