import { makeStyles } from "@material-ui/styles";
import React from "react";
import { style } from "../Common/Style";
import { BasePlayer } from "./BasePlayerInterface";

const useStyles = makeStyles({
    tableRow: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        border: 'solid',
        borderColor: style.bloodBowlGrey,
        boxShadow: `5px 5px 15px ${style.bloodBowlGrey}`,
        marginTop: 10,
        marginBottom: 10,
        padding: 10
    },
    listElement: {
        flex: 1,
        textAlign: 'center'
    },
    listName: {
        flex: 2
    },
    listeValue: {
        flex: 1,
        textAlign: 'right'
    }
})

interface BasePlayerComponentProps {
    player: BasePlayer
}

function BasePlayerComponent({ player }: BasePlayerComponentProps) {
    const classes = useStyles()
    return (
        <div className={classes.tableRow}>
            <div className={classes.listName}>{player.basePlayerRole}</div>
            <div className={classes.listElement}>{player.movement}</div>
            <div className={classes.listElement}>{player.strenght}</div>
            <div className={classes.listElement}>{player.agility}+</div>
            <div className={classes.listElement}>{player.passAbility && `${player.passAbility}+` || 'NaN'}</div>
            <div className={classes.listElement}>{player.armor}+</div>
            <div className={classes.listeValue}>{player.cost * 1000}</div>
        </div>

    )
}

export default BasePlayerComponent