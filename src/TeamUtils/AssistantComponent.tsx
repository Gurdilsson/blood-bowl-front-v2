import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
    container: {
        display: 'flex'
    }
})

interface AssistantComponentProps {
    number: number
    addAssistant: () => void
    removeAssistant: () => void
}

function AssistantComponent({ number, addAssistant, removeAssistant }: AssistantComponentProps) {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            
            <div>Assistant: </div>
            <button onClick={removeAssistant}>-</button>
            {number}
            <button onClick={addAssistant}>+</button>
        </div>
    )
}

export default AssistantComponent