import React, { useEffect } from "react";
import './LoadingPage.scss'
import { useNavigate } from "react-router-dom";

function LoadingPage() {
    const navigate = useNavigate()
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    async function waitBeforeLoad() {
        await delay(4000)
        navigate('/home')
    }

    useEffect(() => {
        waitBeforeLoad()
    });

    return (
        <div>
            <div className="loading_container">
                <div className="loading_sub_container">
                    <div className="loading_label">LOADING</div>
                    <div className="loading-bar">
                        <div className="loading-bar--progress">
                            <span className="first"></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span className="last"></span>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default LoadingPage