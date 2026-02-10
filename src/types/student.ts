export interface Student {
    id: string;
    rollNo: string;
    name: string;
    email: string;
    department: string;
    cgpa: number;
    placed: boolean;
    backlogs: number;
    missedDrives: number;
    status: 'ACTIVE' | 'INACTIVE' | 'PLACED';
}
