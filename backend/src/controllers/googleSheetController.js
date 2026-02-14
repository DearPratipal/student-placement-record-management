// Old Logic
/*
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
};*/

import fetch from 'node-fetch';
import { parse } from 'csv-parse/sync';
import Student from '../models/Student.js';

export const importFromGoogleSheet = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ message: 'Sheet URL required' });
        }

        // Extract Sheet ID
        const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (!match) {
            // return res.status(400).json({ message: 'Invalid Google Sheet URL' });
            return res.status(400).json({ message: 'Google Sheet import currently unavailable. Please use Excel upload.' });
        }

        const sheetId = match[1];

        // Force correct CSV export URL
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

        const response = await fetch(csvUrl);
        const csvText = await response.text();

        // 🚨 Important check
        if (csvText.startsWith('<!DOCTYPE')) {
            return res.status(400).json({
                message: 'Sheet is not public. Make it public: Anyone with link → Viewer'
            });
        }

        const records = parse(csvText, {
            columns: true,
            skip_empty_lines: true,
        });

        if (!records.length) {
            return res.status(400).json({ message: 'No data found in sheet' });
        }

        await Student.insertMany(records);

        res.json({
            message: 'Google Sheet imported successfully',
            count: records.length,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
