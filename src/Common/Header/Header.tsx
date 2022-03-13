import { makeStyles } from "@material-ui/core";
import React from "react";
import { ReactComponent as Icone } from '../Images/icone.svg'
import { style } from "../Style";

export const useStyles = makeStyles({
    title: {
        fontFamily: "Gutcruncher",
        color: style.bloodBowlWhite,
        fontSize: 50,
        margin: 10,
        marginLeft: 20,
        textShadow: '1px 1px 1px black',
        flex: 1
    },
    image: {
        width: '10vh',
        height: '10vh'
    },
    container: {
        display: 'flex',
        backgroundColor: style.bloodBowlDarkBlue,
        minHeight: '10vh',
        maxHeight: '10vh',
        alignItems: 'center'
    }
})

function Header() {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <Icone className={classes.image} />
            <div className={classes.title}>Ligue de Blood Bowl Thoréfoléenne</div>
        </div>
    )
}

export default Header