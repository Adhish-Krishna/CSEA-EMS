export interface CreateClubDTO {
    name: string;
    about?: string;
}

export interface AddClubAdminDTO {
    user_id: number;
    club_id: number;
    role?: string;
}