import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { isUserLogged } from "../Authentification/AuthentificationUtils";
import { USER_ID } from "../Authentification/UserInterface";
import Header from "../Common/Header/Header";
import { style } from "../Common/Style";
import NavigationBar from "../Navigation/NavigationBar";

const useStyles = makeStyles({
    container : {
        display: 'flex',
        backgroundColor: style.bloodBowlWhite
    },
    homeContainer: {
        alignSelf: 'center',
        flex: 1,
        marginLeft: '20vh',
        marginRight: '20vh',
        height: '100vh',
        backgroundColor: style.bloodBowlBlue,
        minWidth: '30vh'
    }
})

function Home() {
    const [user,] = useState(window.localStorage.getItem(USER_ID))
    const classes = useStyles()

    if (!isUserLogged()) {
        return (
            <Navigate to="/login" />
        )
    } else {
        return (
            <div className={classes.container}>
                <NavigationBar />
                <div className={classes.homeContainer}>Salut</div> 
            </div>

        )
    }
}

export default Home