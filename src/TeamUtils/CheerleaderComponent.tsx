import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
    container: {
        display: 'flex'
    }
})

interface CheerleaderComponentProps {
    number: number
    addCheerleader: () => void
    removeCheerleader: () => void
}

function CheerleaderComponent({ number, addCheerleader, removeCheerleader }: CheerleaderComponentProps) {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div>Cheerleaders: </div>
            <button onClick={removeCheerleader}>-</button>
            {number}
            <button onClick={addCheerleader}>+</button>
        </div>
    )
}

export default CheerleaderComponent