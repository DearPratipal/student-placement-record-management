import Student from '../models/Student.js';

export const getStudents = async (_req, res) => {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
};

export const addStudent = async (req, res) => {
    const student = await Student.create(req.body);
    res.status(201).json(student);
};
