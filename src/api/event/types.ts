export interface EventRegistration {
    event_id: number,
    teamName: string
}

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
  