export interface LoginGlobalAdmin {
    rollno: string;
    password: string;
}

export interface GlobalAdminSignUp {
    name: string;
    rollno: string;
    password: string;
    department: string;
    email: string;
    phoneno: bigint;
    yearofstudy: number;
    is_global_admin: boolean;
}