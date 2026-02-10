import Drive from '../models/Drive.js';

export const getDrives = async (_req, res) => {
    const drives = await Drive.find().sort({ createdAt: -1 });
    res.json(drives);
};

export const addDrive = async (req, res) => {
    const drive = await Drive.create(req.body);
    res.status(201).json(drive);
};
