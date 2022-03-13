import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { style } from "../Common/Style";
import TeamComponent from "./TeamComponent";
import { Team } from "./TeamInterface";

const useStyles = makeStyles({
    title: {
        fontFamily: 'Gutcruncher'
    },
    teamList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)'
    },
    team: {
        margin: 10,
        listStyle: 'none'
    },
    allTeamContainer: {
        backgroundColor: style.bloodBowlBlue,
        marginRight: '25vw',
        marginLeft: '10vw',
        width: '60vw    '
    }
})

function AllTeamComponent() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [teams, setTeams] = useState<Team[]>([])

    useEffect(() => {
        getAllTeams()
    }, []);

    async function getAllTeams() {
        await fetch(`http://localhost:8080/team/all`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then((data) => setTeams(data))

    }

    const teamLists = teams.map(
        (team) => <li key={team.teamId} className={classes.team}><TeamComponent team={team} /></li>
    )

    console.log(teams)

    return (
        <div className={classes.allTeamContainer}>
            <h1 className={classes.title}>Les Equipes</h1>
            <div className={classes.teamList}>{teamLists}</div>
            <div onClick={() => navigate('/create-team')}>Create team</div>
        </div>
    )
}

export default AllTeamComponent