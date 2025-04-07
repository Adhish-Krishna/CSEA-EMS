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
export interface ClubMember {
    club_id: number;
    role: string;
}

export interface Club  {
    name: string;
    id: number;
}

export interface MembershipDetails{
    name:string;
    id:number;
    role:string;
}

export interface invite{
    event_id:Number;
    from_user_id:Number;
    from_team_id:Number;
}