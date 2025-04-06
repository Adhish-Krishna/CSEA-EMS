export interface CreateEventDTO {
    name: string;
    about?: string;
    date: string;
    event_type: string;
    venue: string;
    event_category: string;
    min_no_member?: number;
    max_no_member?: number;
    club_id: number;
    user_id: number; 
}
