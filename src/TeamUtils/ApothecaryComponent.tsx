import React from "react";

interface ApothecaryComponentProps {
    apothecary: boolean
    onApothecaryChanged: () => void
    disable: boolean
}

function ApothecaryComponent({apothecary, onApothecaryChanged, disable}: ApothecaryComponentProps) {
    return(
        <div>
            Apothicaire: <input type='checkbox' checked={apothecary} onChange={() => onApothecaryChanged()} disabled={disable}/>
        </div>
    )
}

export default ApothecaryComponent