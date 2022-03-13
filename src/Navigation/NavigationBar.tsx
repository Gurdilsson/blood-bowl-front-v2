import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import LogoutButton from "../Authentification/LogoutButton";
import classNames from "classnames";
import { BiBall, BiUser, BiCoinStack, BiBookOpen, BiGlassesAlt, BiTrophy, BiCalendar, BiHome, BiRun } from "react-icons/bi";
import { style } from "../Common/Style";
import { ReactComponent as Icone } from '../Common/Images/icone.svg'
import { useNavigate } from "react-router-dom";
import { USER_NAME } from "../Authentification/UserInterface";

const iconStyle = {
    color: style.bloodBowlWhite,
    size: '30px'
}

const useStyles = makeStyles({
    text: {
        fontFamily: 'Gutcruncher',
        fontSize: 30,
        color: style.bloodBowlWhite,
        marginLeft: 10
    },
    list: {
        display: 'flex',
        alignItems: 'center',
        borderStyle: ' none none solid none ',
        borderColor: style.bloodBowlWhite,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: style.bloodBowlDarkBlue,
        }
    },
    ul: {
        padding: 0,
        listStyleType: 'none',
    },
    body: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        minHeight: '100vh',
        maxWidth: '30vh',
        backgroundColor: style.bloodBowlBlue,
        '& .hidden': {
            color: 'red',
        },
        display: 'flex',
        flexDirection: 'column',
    },
    image: {
        width: '15vw',
        height: '20vh',
        alignSelf: 'center',
        margin: 10
    }
})

function NavigationBar() {

    const classes = useStyles()
    const [hidden, ] = useState(false)
    const [userName,] = useState(window.localStorage.getItem(USER_NAME))
    const navigate = useNavigate()

    function handleLogoutClick() {
        window.localStorage.clear()
        navigate('/login')
    }

    function redirect(route: string) {
        navigate(`/${route}`)
    }

    return (
        <div className={classNames(classes.body, { hidden: hidden })}>
            <Icone className={classes.image} />
            <ul className={classes.ul}>
                <li className={classNames(classes.list, { hidden: hidden })} onClick={() => redirect('home')}>
                    <BiHome size={iconStyle.size} color={iconStyle.color} />
                    <div className={classes.text}>Home</div>
                </li>
                <li className={classes.list} onClick={() => redirect('personal-page')}>
                    <BiUser size={iconStyle.size} color={iconStyle.color} />
                    <div className={classes.text}>{userName}</div>
                </li>
                <li className={classes.list} onClick={() => redirect('teams')}>
                    <BiBall size={iconStyle.size} color={iconStyle.color} />
                    <div className={classes.text}>Equipes</div>
                </li>
                <li className={classes.list}>
                    <BiCoinStack size={iconStyle.size} color={iconStyle.color} />
                    <div className={classes.text}> Boutique </div>
                </li>
                <li className={classes.list}>
                    <BiTrophy size={iconStyle.size} color={iconStyle.color} />
                    <div className={classes.text}>Classement</div>
                </li>
                <li className={classes.list}>
                    <BiCalendar size={iconStyle.size} color={iconStyle.color} />
                    <div className={classes.text}>Planning</div>
                </li>
                <li className={classes.list}>
                    <BiBookOpen size={iconStyle.size} color={iconStyle.color} />
                    <div className={classes.text}>Règles</div>
                </li>
                <li className={classes.list}>
                    <BiGlassesAlt size={iconStyle.size} color={iconStyle.color} />
                    <div className={classes.text}>A propos</div>
                </li>
                <li className={classes.list} onClick={handleLogoutClick}>
                    <BiRun size={iconStyle.size} color={iconStyle.color} />
                    <div className={classes.text}>Déconexion</div>
                </li>
            </ul>
        </div >
    )
}

export default NavigationBar