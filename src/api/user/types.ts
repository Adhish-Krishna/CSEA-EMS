export interface TeamInvite {
    from_team_id: number;
    to_user_id:number;
    event_id: number;
}

export interface Feedback{
    event_id: number;
    feedback: string;
    rating: number;
}

export interface EventRegistration {
    event_id: number;
    teamName: string;
}
