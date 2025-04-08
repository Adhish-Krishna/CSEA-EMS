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
    teamName: string ;
}
export interface ClubMember {
    club_id: number;
    role: string|null;
}

export interface Club  {
    name: string | null;
    id: number;
}

export interface MembershipDetails{
    name:string|null;
    id:number;
    role:string|null;
}

export interface Invite{
    event_id:number;
    from_user_id:number;
    from_team_id:number;
}