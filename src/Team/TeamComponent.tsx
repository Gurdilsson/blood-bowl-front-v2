import { makeStyles } from "@material-ui/core";
import React from "react";
import { style } from "../Common/Style";
import { Team } from "./TeamInterface";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: style.bloodBowlGrey,
        padding: 10,
        boxShadow: '5px 5px 15px black',
        transition: 'transform .2s',
        '&:hover': {
            transform: 'scale(1.1)'
        },
        height: 200
    }
})

export interface TeamComponentProps {
    team: Team
}

function TeamComponent({ team }: TeamComponentProps) {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div>{team.teamName}, {team.coach}, {team.race}</div>
            <div>Cheerleaders : {team.cheerleader}</div>
            <div>Assistants coach : {team.coachAssistants}</div>



        </div>
    )
}

export default TeamComponent