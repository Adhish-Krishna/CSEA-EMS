export interface SignUpUser{
    name: string;
    rollno: string;
    password: string;
    department: string;
    email: string;
    phoneno: bigint;
    yearofstudy: number;
    created_at: Date;
}

export interface LoginUser{
    rollno: string
    password: string;
}