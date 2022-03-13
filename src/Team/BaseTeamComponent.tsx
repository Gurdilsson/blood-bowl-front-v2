import { makeStyles } from "@material-ui/styles";
import React from "react";
import { style } from "../Common/Style";
import BasePlayerComponent from "../Player/BasePlayerComponent";
import { BasePlayer } from "../Player/BasePlayerInterface";
import { Player } from "../Player/PlayerInterface";
import { BaseTeam } from "./BaseTeamInterface";
import { Team } from "./TeamInterface";

const useStyles = makeStyles({
    button: {
        border: 'none',
        cursor: 'pointer',
        backgroundColor: 'lightGreen',
        boxShadow: `5px 5px 15px ${style.bloodBowlGrey}`,
        borderRadius: 25,
        marginLeft: 10,
        marginRight: 10,
        minWidth: 50,
        minHeight: 50,
    },
    playerElement: {
        display: 'flex',
        alignItems: 'center',
        transition: 'transform .2s',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    },
    disableButton: {
        border: 'none',
        cursor: 'pointer',
        backgroundColor: 'yellow',
        boxShadow: `5px 5px 15px ${style.bloodBowlGrey}`,
        borderRadius: 25,
        marginLeft: 10,
        marginRight: 10,
        minWidth: 50,
        minHeight: 50,
    }
})

interface BaseTeamComponentProps {
    team: BaseTeam
    addPlayer: (player: BasePlayer) => void
    newTeam: Player[]
    total: number
}

function BaseTeamComponent({ team, addPlayer, newTeam, total }: BaseTeamComponentProps) {

    const classes = useStyles()

    function isNotAtMaximum(player: BasePlayer): boolean {
        const sameRoleList = newTeam.filter(p => p.position === player.basePlayerRole)
        return sameRoleList.length < player.quantityMax
    }

    function isTooExpensive(player: BasePlayer): boolean {
        return total + player.cost > 1000
    }

    const playerList = team.basePlayer.map((player: BasePlayer) => {
        return (
            <div key={player.basePlayerId} className={classes.playerElement}>
                <BasePlayerComponent player={player} />
                {true &&
                    <button
                        onClick={() => addPlayer(player)}
                        className={(!isNotAtMaximum(player) || isTooExpensive(player)) ? classes.disableButton : classes.button}
                        disabled={!isNotAtMaximum(player) || isTooExpensive(player)}>
                        {(!isNotAtMaximum(player) || isTooExpensive(player))
                            ? 'max'
                            : '+'}
                    </button>
                }
            </div>)
    })

    return (
        <div>
            Race: {team.race} <br />
            Catégorie: {team.category}<br />
            Relance: {team.rerollCost}<br />
            Apothicaire: {team.apothecary}<br />
            Description: {team.teamDescription}<br />
            <div>{playerList}</div>
        </div>
    )
}

export default BaseTeamComponent