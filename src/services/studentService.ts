import { Student } from '../types/student';
import { students as mockStudents } from '../services/mockData';

// later API switch
export const getStudents = async (): Promise<Student[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockStudents), 300);
    });
};
