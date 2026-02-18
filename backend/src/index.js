import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';
import driveRoutes from './routes/driveRoutes.js';
import excelRoutes from './routes/excelRoutes.js';
import googleSheetRoutes from './routes/googleSheetRoutes.js';
import importRoutes from './routes/import.routes.js';
import queryRoutes from "./routes/queryRoutes.js";  // Query Routes

dotenv.config();

const app = express();

// DB connect
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/drives', driveRoutes);
app.use('/api/import', excelRoutes);
app.use('/api/import/google-sheet', googleSheetRoutes);
app.use('/api/import', importRoutes);
app.use('/api/import', googleSheetRoutes);
app.use("/api/queries", queryRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running successfully 🚀');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
