export interface Drive {
    id: string;
    companyName: string;
    role: string;
    packageLPA: number;
    date: string;
    eligibilityCgpa: number;
    eligibleBranches: string[];
    status: 'UPCOMING' | 'ONGOING' | 'COMPLETED';
    description: string;
}
