import * as XLSX from 'xlsx';
import { Student } from '../types/student';

export const parseExcel = (file: File): Student[] => {
    const workbook = XLSX.read(file, { type: 'binary' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json<Student>(sheet);
};
