import { makeStyles } from "@material-ui/core";
import React from "react";
import { style } from "../Common/Style";
import NavigationBar from "../Navigation/NavigationBar";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        backgroundColor: style.bloodBowlWhite
    }
})

function PersonalPage() {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <NavigationBar />
            
        </div>
    )
}

export default PersonalPage