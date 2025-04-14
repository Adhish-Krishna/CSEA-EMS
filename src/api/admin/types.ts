export interface CreateEventDTO {
    name: string;
    about: string;
    date: string;
    event_type: string;
    venue: string;
    event_category: string;
    min_no_member: number;
    max_no_member: number;
    club_id: number;
    eventConvenors?: string[];
    chief_guest?: string;
    exp_expense?: number;
    tot_amt_allot_su?: number;
    tot_amt_spt_dor?: number;
    exp_no_aud?: number;
    faculty_obs_desig?: string;
    faculty_obs_dept?: string;
    poster?: Buffer | null; 
}

export interface Attendance {
    user_id : number,
    event_id : number,
    is_present : boolean,
}

export interface EventConvenor {
    name: string | null;
    department: string | null;
    yearofstudy: number | null;
}
  
export interface EventWinner {
    position: number | null;
    team_name: string | null | undefined;
}
  
export interface PastEventData {
    name: string | null;
    about: string | null;
    date: Date | null;
    event_type: string | null;
    event_category: string | null;
    eventConvenors: EventConvenor[];
    eventWinners: EventWinner[];
    average_rating: number;
    total_registered_teams: number;
    total_attendance: number;
}
  
export interface PastEventsResponse {
    message: string;
    data: PastEventData[];
}

export interface FeedbackItem {
    id: number;
    created_at: Date | null;
    feedback: string | null;
    user_id: number;
    event_id: number;
    rating: number | null;
}

export interface PrismaEvent {
    name: string | null;
    about: string | null;
    date: Date | null;
    venue: string | null;
    event_type: string | null;
    event_category: string | null;
    eventconvenors: {
        users: {
            name: string | null;
            department: string | null;
            yearofstudy: number | null;
        } | null;
        id: number;
        club_id: number;
        user_id: number;
        event_id: number;
    }[];
    eventwinners: {
        id: number;
        team_id: number;
        event_id: number;
        position: number | null;
        teams?: {
            name: string | null;
        } | null;
    }[];
    feedback: FeedbackItem[];
    eventregistration: any[];
    teammembers: any[];
    id?: number;
}

export interface ClubMembers {
    members: {
        rollno: string;
        role?: string;
    }[];
}



