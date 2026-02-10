// import { Drive, Student, User, UserRole } from '../../types';
import { UserRole } from "../types/user";
import { Student } from "../types/student";
import { Drive } from "../types/drive";
import { User } from "../types/user";



// Mock Users
export const MOCK_USERS: User[] = [
  { id: '1', name: 'Dr. Admin', email: 'admin@mmumullana.org', role: UserRole.ADMIN },
  { id: '2', name: 'Dr. Dalip Kamboj', email: 'tpo@mmumullana.org', role: UserRole.TNP_OFFICER, department: 'CSE' },
  { id: '3', name: 'Coordinator Rahul', email: 'coord@mmumullana.org', role: UserRole.COORDINATOR, department: 'ECE' },
];

// Mock Students
export const MOCK_STUDENTS: Student[] = [
  { id: '101', rollNo: '11202501', name: 'Aarav Gupta', email: 'aarav@student.mmdu.org', department: 'CSE', cgpa: 8.5, placed: false, backlogs: 0, missedDrives: 1, status: 'ACTIVE' },
  { id: '102', rollNo: '11202502', name: 'Diya Singh', email: 'diya@student.mmdu.org', department: 'ECE', cgpa: 7.2, placed: true, backlogs: 0, missedDrives: 0, status: 'PLACED' },
  { id: '103', rollNo: '11202503', name: 'Rohan Mehta', email: 'rohan@student.mmdu.org', department: 'ME', cgpa: 6.5, placed: false, backlogs: 1, missedDrives: 4, status: 'INACTIVE' },
  { id: '104', rollNo: '11202504', name: 'Ishaan Kumar', email: 'ishaan@student.mmdu.org', department: 'CSE', cgpa: 9.1, placed: false, backlogs: 0, missedDrives: 0, status: 'ACTIVE' },
  { id: '105', rollNo: '11202505', name: 'Ananya Roy', email: 'ananya@student.mmdu.org', department: 'Biotech', cgpa: 8.8, placed: false, backlogs: 0, missedDrives: 2, status: 'ACTIVE' },
  { id: "1", rollNo: "1323001", name: "", email: "", department: "", cgpa: 0, placed: false, backlogs: 0, missedDrives: 0, status: "INACTIVE" },
  { id: "2", rollNo: "1323002", name: "SHELLY KAMBOJ", email: "Kambojshelly674@gmail.com", department: "BCA", cgpa: 6.2, placed: false, backlogs: 0, missedDrives: 0, status: "ACTIVE" },
  { id: "607", rollNo: "1323607", name: "PRATIPAL KUMAR SINGH", email: "kumarpratipal123@gmail.com", department: "DS", cgpa: 7.865, placed: false, backlogs: 0, missedDrives: 0, status: "ACTIVE" }
];

// Mock Drives
export const MOCK_DRIVES: Drive[] = [
  { id: '201', companyName: 'Google', role: 'Software Engineer', packageLPA: 24, date: '2024-05-20', eligibilityCgpa: 8.5, eligibleBranches: ['CSE', 'ECE'], status: 'UPCOMING', description: 'Core development role.' },
  { id: '202', companyName: 'TCS', role: 'System Engineer', packageLPA: 7, date: '2024-05-15', eligibilityCgpa: 6.5, eligibleBranches: ['CSE', 'ECE', 'ME', 'Biotech'], status: 'ONGOING', description: 'Mass recruitment drive.' },
  { id: '203', companyName: 'Infosys', role: 'Power Programmer', packageLPA: 9, date: '2024-04-10', eligibilityCgpa: 7.0, eligibleBranches: ['CSE'], status: 'COMPLETED', description: 'Specialized role for coders.' },
];

/*
// Simulation Service
export const apiService = {
  login: async (email: string): Promise<User | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(u => u.email === email);
        resolve(user);
      }, 800);
    });
  },

  getStudents: async (): Promise<Student[]> => {
    return new Promise(resolve => setTimeout(() => resolve([...MOCK_STUDENTS]), 500));
  },

  getDrives: async (): Promise<Drive[]> => {
    return new Promise(resolve => setTimeout(() => resolve([...MOCK_DRIVES]), 500));
  },

  addDrive: async (drive: Drive): Promise<Drive> => {
    return new Promise(resolve => {
      MOCK_DRIVES.push(drive);
      setTimeout(() => resolve(drive), 500);
    });
  },

  addStudent: async (student: Student): Promise<Student> => {
    return new Promise(resolve => {
      MOCK_STUDENTS.push(student);
      setTimeout(() => resolve(student), 500);
    });
  }
};*/