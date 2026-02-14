import Student from '../models/Student.js';

export const getStudents = async (_req, res) => {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
};

export const addStudent = async (req, res) => {
    const student = await Student.create(req.body);
    res.status(201).json(student);
};

/*
export const deleteStudent = async (req, res) => {
    const student = await Student.findById(req.params.id);

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    await student.remove();

    res.json({ message: 'Student removed' });
};*/

export const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
