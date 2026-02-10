export enum UserRole {
    ADMIN = 'ADMIN',
    TNP_HEAD = 'TNP_HEAD',
    TNP_OFFICER = 'TNP_OFFICER',
    COORDINATOR = 'COORDINATOR'
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    department?: string;
}
