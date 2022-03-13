import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { USER_ID, USER_PSEUDO } from "../Authentification/UserInterface";
import { style } from "../Common/Style";
import NavigationBar from "../Navigation/NavigationBar";
import { BasePlayer } from "../Player/BasePlayerInterface";
import { Player } from "../Player/PlayerInterface";
import ApothecaryComponent from "../TeamUtils/ApothecaryComponent";
import AssistantComponent from "../TeamUtils/AssistantComponent";
import CheerleaderComponent from "../TeamUtils/CheerleaderComponent";
import FanComponent from "../TeamUtils/FanComponent";
import RerollComponent from "../TeamUtils/RerollComponent";
import BaseTeamComponent from "./BaseTeamComponent";
import { BaseTeam } from "./BaseTeamInterface";
import NewTeamComponent from "./NewTeamComponent";
import { baseTeamMaxValue, Team } from "./TeamInterface";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        backgroundColor: style.bloodBowlWhite,
    },
    leftPart: {
        flex: 1,
        height: '90vh',
        padding: '5vh'
    },
    rightPart: {
        flex: 1,
        height: '90vh',
        padding: '5vh',
        overflow: 'scroll',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
    },
    list: {
        listStyle: 'none'
    },
    title: {
        fontFamily: 'Gutcruncher'
    }
})

function TeamCreationPage() {

    const classes = useStyles()

    const [teams, setTeams] = useState<BaseTeam[]>([])
    const [selectedTeam, setSelectedTeam] = useState<BaseTeam>(teams[0])
    const [newPlayers, setNewPlayers] = useState<Player[]>([])
    const [tmpId, setTmpId] = useState(0)

    const [rerolls, setRerolls] = useState(0)
    const [cheerleaders, setCheerleaders] = useState(0)
    const [coachAssistants, setCoachAssistants] = useState(0)
    const [fans, setFans] = useState(0)
    const [apothecary, setApothecary] = useState(false)
    const [total, setTotal] = useState(0)
    const [teamName, setTeamName] = useState('')
    const disable = total + 50 > baseTeamMaxValue && !apothecary

    function getId() {
        setTmpId(tmpId + 1)
        return tmpId
    }

    useEffect(() => {
        getAllTeams()
    }, []);

    async function getAllTeams() {
        await fetch(`http://localhost:8080/base-team/all`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then((data) => {
                setTeams(data)
                setSelectedTeam(data[0])
            })
    }

    function addPlayer(player: BasePlayer) {
        const players: Player[] = newPlayers || []
        const newPlayer: Player = {
            id: getId(),
            playerName: 'Nom par défault',
            movement: player.movement,
            strenght: player.strenght,
            agility: player.agility,
            passAbility: player.passAbility,
            armor: player.armor,
            cost: player.cost,
            missNextMatch: false,
            persistantInjury: 0,
            handoff: 0,
            elimination: 0,
            diversion: 0,
            interception: 0,
            touchDown: 0,
            playerOfTheMatch: 0,
            starPlayerPoint: 0,
            playerLevel: 1,
            saison: 1,
            position: player.basePlayerRole,
            skills: player.skills,
            teamId: 1
        }
        players?.push(newPlayer)
        setNewPlayers([...players])
        setTotal(total + newPlayer.cost)
    }


    function addReroll() {
        if (total + selectedTeam?.rerollCost <= baseTeamMaxValue && rerolls < 8) {
            setRerolls(rerolls + 1)
            setTotal(total + selectedTeam?.rerollCost)
        }
    }

    function removeReroll() {
        if (rerolls > 0) {
            setRerolls(rerolls - 1)
            setTotal(total - selectedTeam?.rerollCost)
        }
    }

    function addCheerleader() {
        if (total + 10 <= baseTeamMaxValue) {
            setCheerleaders(cheerleaders + 1)
            setTotal(total + 10)
        }
    }

    function removeCheerleader() {
        if (cheerleaders > 0) {
            setCheerleaders(cheerleaders - 1)
            setTotal(total - 10)
        }
    }

    function removeAssistant() {
        if (coachAssistants > 0) {
            setCoachAssistants(coachAssistants - 1)
            setTotal(total - 10)
        }
    }

    function addAssistant() {
        if (total + 10 <= baseTeamMaxValue) {
            setCoachAssistants(coachAssistants + 1)
            setTotal(total + 10)
        }
    }

    function removeFan() {
        if (fans > 0) {
            setFans(fans - 1)
            setTotal(total - 10)
        }
    }

    function addFan() {
        if (total + 10 <= baseTeamMaxValue) {
            setFans(fans + 1)
            setTotal(total + 10)
        }
    }

    function removePlayer(player: Player) {
        const players: Player[] = newPlayers || []
        const playerFiltered = players.filter(p => p.id !== player.id)
        setNewPlayers([...playerFiltered])
        setTotal(total - player.cost)
    }

    function onTeamNameChange(teamName: string) {
        setTeamName(teamName)
    }

    function onApothecaryChanged() {
        if (apothecary) {
            setTotal(total - 50)
        } else {
            if(total + 50 <= baseTeamMaxValue)
            setTotal(total + 50)
        }
        setApothecary(!apothecary)

    }

    async function createFinaleTeam() {
        const finalTeam: Team = {
            teamName: teamName,
            race: selectedTeam.race,
            stadium: '',
            sponsor: '',
            coach: window.localStorage.getItem(USER_PSEUDO) || '',
            leaguePoint: 0,
            actualValue: total,
            totalValue: total,
            cheerleader: cheerleaders,
            coachAssistants: coachAssistants,
            apothecary: apothecary ? 1 : 0,
            fans: fans,
            players: newPlayers,
            userId: parseInt(window.localStorage.getItem(USER_ID) || '0')
        }
        console.log(finalTeam)
        await fetch(`http://localhost:8080/team/create`, { method: 'POST', body: JSON.stringify(finalTeam), headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                console.log('New Team')
                console.log(data)
            })


    }

    const teamLists = teams.map(
        (team) => <li key={team.race}>
            <BaseTeamComponent
                team={team}
                addPlayer={addPlayer}
                newTeam={newPlayers || []}
                total={total}
            />
        </li>
    )

    return (
        <div className={classes.container}>
            <NavigationBar />
            <div className={classes.leftPart}>
                <h1 className={classes.title}>Création d'équipe</h1>
                <div className={classes.list}>
                    {selectedTeam != null &&
                        <BaseTeamComponent
                            team={selectedTeam}
                            addPlayer={addPlayer}
                            newTeam={newPlayers || []}
                            total={total}
                        />
                    }
                </div>
            </div>
            <div className={classes.rightPart}>
                {total}
                <CheerleaderComponent
                    addCheerleader={addCheerleader}
                    removeCheerleader={removeCheerleader}
                    number={cheerleaders}
                />
                <AssistantComponent
                    addAssistant={addAssistant}
                    removeAssistant={removeAssistant}
                    number={coachAssistants}
                />
                <FanComponent
                    addFan={addFan}
                    removeFan={removeFan}
                    number={fans}
                />
                {selectedTeam != null && selectedTeam.apothecary &&
                    <ApothecaryComponent
                        apothecary={apothecary}
                        onApothecaryChanged={onApothecaryChanged} 
                        disable={disable}
                        />
                }
                <RerollComponent
                    addReroll={addReroll}
                    removeReroll={removeReroll}
                    number={rerolls}
                />
                <NewTeamComponent
                    newPlayers={newPlayers || []}
                    removePlayer={removePlayer}
                    onTeamNameChange={onTeamNameChange}
                />
                <button onClick={() => createFinaleTeam()}>Valider mon équipe</button>
            </div>

        </div>
    )
}

export default TeamCreationPage