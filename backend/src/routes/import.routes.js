// backend/src/routes/import.routes.js

import express from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
// import fetch from 'node-fetch';
import Student from '../models/Student.js';
// import { convertToCsvUrl } from '../utils/googleSheet.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


// =========================
// 📌 EXCEL IMPORT
// =========================
router.post('/students', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const data = xlsx.utils.sheet_to_json(sheet);

        if (!data.length) {
            return res.status(400).json({ message: 'Excel file is empty' });
        }

        await Student.insertMany(data);

        res.json({
            message: 'Excel imported successfully',
            count: data.length
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Excel import failed' });
    }
});


// ========================
// 📌 GOOGLE SHEET IMPORT
// =========================
/*
router.post('/google-sheet/students', async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ message: 'Google Sheet URL required' });
        }

        const csvUrl = convertToCsvUrl(url);

        console.log("Fetching CSV from:", csvUrl);

        const response = await fetch(csvUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
            }
        });

        if (!response.ok) {
            return res.status(400).json({
                message: 'Failed to fetch Google Sheet'
            });
        }

        const csvText = await response.text();

        // 🔥 VERY IMPORTANT CHECK
        if (csvText.startsWith('<!DOCTYPE')) {
            return res.status(400).json({
                message: 'Google blocked request. Try re-saving sheet as CSV.'
            });
        }

        const workbook = xlsx.read(csvText, { type: 'string' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const data = xlsx.utils.sheet_to_json(sheet);

        if (!data.length) {
            return res.status(400).json({ message: 'No valid rows found' });
        }

        await Student.insertMany(data);

        res.json({
            message: 'Google Sheet imported successfully',
            count: data.length
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});
*/

// New logic Failed 
/*
router.post('/google-sheet/students', async (req, res) => {
    try {
        const { csvText } = req.body;

        if (!csvText) {
            return res.status(400).json({ message: 'CSV data required' });
        }

        const workbook = xlsx.read(csvText, { type: 'string' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const data = xlsx.utils.sheet_to_json(sheet);

        if (!data.length) {
            return res.status(400).json({ message: 'No valid rows found' });
        }

        await Student.insertMany(data);

        res.json({
            message: 'Google Sheet imported successfully',
            count: data.length
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});*/

// New logic with file upload
router.post('/google-sheet/students', async (req, res) => {
    try {
        const { csvText } = req.body;

        if (!csvText) {
            return res.status(400).json({ message: 'CSV data required' });
        }

        const workbook = xlsx.read(csvText, { type: 'string' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const data = xlsx.utils.sheet_to_json(sheet);

        if (!data.length) {
            return res.status(400).json({ message: 'No valid rows found' });
        }

        await Student.insertMany(data);

        res.json({
            message: 'Google Sheet imported successfully',
            count: data.length
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

export default router;