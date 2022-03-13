import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
    container: {
        display: 'flex'
    }
})

interface RerollComponentProps {
    number: number
    addReroll: () => void
    removeReroll: () => void
}

function RerollComponent({ number, addReroll, removeReroll }: RerollComponentProps) {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div>Relances: </div>
            <button onClick={removeReroll}>-</button>
            {number}
            <button onClick={addReroll}>+</button>
        </div>
    )
}

export default RerollComponent