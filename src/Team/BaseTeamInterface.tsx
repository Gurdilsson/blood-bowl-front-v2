import { BasePlayer } from "../Player/BasePlayerInterface";

export interface BaseTeam {
    race : string
    rerollCost: number
    apothecary: boolean
    category: number
    teamDescription: string
    basePlayer: BasePlayer[]
}