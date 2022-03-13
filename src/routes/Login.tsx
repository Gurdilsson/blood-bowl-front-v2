import { makeStyles } from "@material-ui/styles";
import React from "react";
import LoginComponent from "../Authentification/LoginComponent";
import { style } from "../Common/Style";

import Header from "../Common/Header/Header";
import AccountCreationComponent from "../Authentification/AccountCreationComponent";

export const useStyles = makeStyles({
    globalContainer: {
        display: 'flex',
        height: '100vh',
        flexDirection: 'column'
    },
    secondContainer: {
        display: 'flex',
        flex: 1
    },
    loginContainer: {
        flex: 1,
        backgroundColor: style.bloodBowlBlue,
        display: 'flex',
        flexDirection: 'column',
    },
    inscriptionContainer: {
        flex: 1,
        backgroundColor: style.bloodBowlWhite,
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        backgroundColor: style.bloodBowlDarkBlue,
        minHeight: '10vh',
    }
});

function Login() {
    const classes = useStyles()
    return (
        <div className={classes.globalContainer}>
            <div className={classes.header}>
                <Header />
            </div>
            <div className={classes.secondContainer}>

                <div className={classes.loginContainer}>
                    <LoginComponent />
                </div>
                <div className={classes.inscriptionContainer}>
                    <AccountCreationComponent />
                </div>

            </div>

        </div>
    )
}

export default Login