import { Skill } from "../Skill/SkillInterface";

export interface BasePlayer {
    basePlayerId: number
    basePlayerRole: string
    quantityMax: number
    cost: number
    movement: number
    strenght: number
    agility: number
    passAbility: number
    armor: number
    race: string
    skills: Skill[]
}