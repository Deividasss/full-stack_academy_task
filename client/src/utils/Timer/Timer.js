import React from "react";
import { useTimer } from "react-timer-hook";
import "../Timer/Timer.scss"

const MyTimer = ({ expiryTimestamp }) => {
    const {
        seconds,
        minutes,
        hours,
        days,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn("onExpire called")
    });

    return (
        <div>
           <h6 className="timerHeader"><span className="timer">{days}</span> Days <span className="timer">{hours}</span> Hours <span className="timer">{minutes}</span> Minutes <span className="timer">{seconds}</span> Seconds</h6>
        </div>

    );
}
export default MyTimer