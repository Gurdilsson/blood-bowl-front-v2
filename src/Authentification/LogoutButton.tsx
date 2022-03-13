import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const navigate = useNavigate()

    function handleLogoutClick() {
        window.localStorage.clear()
        navigate('/login')
    }

    return (
        <div>
            <button onClick={handleLogoutClick}>X</button>
        </div>
    )
}

export default LogoutButton