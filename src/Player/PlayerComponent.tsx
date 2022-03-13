import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Player } from "./PlayerInterface";

const useStyles = makeStyles(theme => ({
    text : {
        backgroundColor: 'red'
    }
}
))

function PlayerComponent () {
    const [players, setPlayers] = useState<Player[]>([])
    const classes = useStyles()


    useEffect(() => {
        fetch('http://localhost:8080/player/all')
        .then(response => response.json())
        .then(data => setPlayers(data));
    }, []);

    const playerList = players.map((player) => <li key={player.id}>{player.playerName}, {player.position}</li>)

    return (
        <div>
            <ul className={classes.text}>{playerList}</ul>    
        </div>
    )
}

export default PlayerComponent