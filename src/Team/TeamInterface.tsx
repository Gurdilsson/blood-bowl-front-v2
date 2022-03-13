import { Player } from "../Player/PlayerInterface";

export interface Team {
    teamId?: number
    teamName: string
    race: string
    stadium: string
    sponsor: string
    coach: string
    leaguePoint: number
    fans: number
    coachAssistants: number
    cheerleader: number
    apothecary: number
    actualValue: number
    totalValue: number
    userId: number
    players: Player[]
}

export const baseTeamMaxValue = 1000