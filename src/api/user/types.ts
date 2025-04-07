export interface TeamInvite {
    from_team_id: number,
    to_team_id: number
}

export interface Feedback{
    event_id: number;
    feedback: string;
    rating: number;
}

export interface EventRegistration {
    event_id: number,
    teamName: string
}
