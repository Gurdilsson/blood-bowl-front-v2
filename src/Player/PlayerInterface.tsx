import { Skill } from "../Skill/SkillInterface";

export interface Player {
    id?: number
    playerName: string
    position: string
    movement: number
    strenght: number
    agility: number
    passAbility: number
    skills: Skill[]
    missNextMatch: boolean
    persistantInjury: number
    handoff: number
    elimination: number
    diversion: number
    interception: number
    touchDown: number
    playerOfTheMatch: number
    playerLevel: number
    saison: number
    starPlayerPoint: number
    armor: number
    cost: number
    teamId: number
}