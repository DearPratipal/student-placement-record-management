import XLSX from 'xlsx';
import Student from '../models/Student.js';

export const importStudentsFromExcel = async (req, res) => {
    try {
        const workbook = XLSX.read(req.file.buffer);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(sheet);

        const students = rows.map(row => ({
            rollNo: row.rollNo,
            name: row.name,
            email: row.email,
            department: row.department,
            cgpa: row.cgpa,
            backlogs: row.backlogs || 0,
            missedDrives: row.missedDrives || 0,
            status: row.status || 'ACTIVE',
        }));

        await Student.insertMany(students, { ordered: false });

        res.json({
            message: 'Students imported successfully',
            count: students.length,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
