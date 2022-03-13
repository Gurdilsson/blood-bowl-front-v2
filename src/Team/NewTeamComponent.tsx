import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { style } from "../Common/Style";
import NewPlayerComponent from "../Player/NewPlayerComponent";
import { Player } from "../Player/PlayerInterface";
import CheerleaderComponent from "../TeamUtils/CheerleaderComponent";
import { baseTeamMaxValue } from "./TeamInterface";

const useStyles = makeStyles({
    button: {
        border: 'none',
        cursor: 'pointer',
        backgroundColor: 'red',
        boxShadow: `5px 5px 15px ${style.bloodBowlGrey}`,
        borderRadius: 25,
        marginLeft: 10,
        marginRight: 10,
        minWidth: 50,
        minHeight: 50
    },
    playerElement: {
        display: 'flex',
        alignItems: 'center',
        transition: 'transform .2s',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    }
})

interface NewTeamComponentProps {
    newPlayers: Player[]
    removePlayer: (player: Player) => void
    onTeamNameChange: (teamName: string) => void
}

function NewTeamComponent({ newPlayers, removePlayer, onTeamNameChange }: NewTeamComponentProps) {
    const [total, setTotal] = useState(0)
    const [hidePlayers, setHidePlayers] = useState(false)
    const [teamName, setTeamName] = useState('')

    const classes = useStyles()

    useEffect(() => {
        setTotal(newPlayers.map(player => player.cost).reduce((a, b) => a + b, 0))
    }, [newPlayers]);

    function hideOnClick() {
        setHidePlayers(!hidePlayers)
    }

    function changeTeamName(teamName: string) {
        setTeamName(teamName)
        onTeamNameChange(teamName)
    }

    const playerList = newPlayers.map((player: Player) => {
        return (
            <div key={player.id} className={classes.playerElement}>
                <NewPlayerComponent player={player} />
                <button onClick={() => removePlayer(player)} className={classes.button}> - </button>
            </div>)
    })

    return (
        <div>
            <input type="text" value={teamName} onChange={e => changeTeamName(e.target.value)} placeholder="Nom de l'équipe" />
            <button onClick={() => hideOnClick()}>{hidePlayers ? 'Montrer les joueurs' : 'Cacher les joueurs'}</button>
            {!hidePlayers &&
                <div>{playerList}</div>
            }
        </div>

    )
}

export default NewTeamComponent