import { makeStyles } from "@material-ui/core";
import React from "react";
import { style } from "../Common/Style";
import NavigationBar from "../Navigation/NavigationBar";
import AllTeamComponent from "../Team/AllTeamComponent";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        backgroundColor: style.bloodBowlWhite
    }
})

function TeamPage() {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <NavigationBar/>
            <AllTeamComponent/>

        </div>
    )
}

export default TeamPage