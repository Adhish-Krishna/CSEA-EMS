//interface for updating event details
export interface UpdateEventDto {
    name?: string;
    about?: string;
    date?: Date | string; 
    event_type?: string;
    event_category?: string;
    min_no_member?: number;
    max_no_member?: number;
    venue?: string;
}
  
export interface WinnerDetails{
    event_id:number,
    team_id:number,
    position:number
}