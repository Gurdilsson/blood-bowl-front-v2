import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
    container: {
        display: 'flex'
    }
})

interface FanComponentProps {
    number: number
    addFan: () => void
    removeFan: () => void
}

function FanComponent({ number, addFan, removeFan }: FanComponentProps) {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div>Fans: </div>
            <button onClick={removeFan}>-</button>
            {number}
            <button onClick={addFan}>+</button>
        </div>
    )
}

export default FanComponent