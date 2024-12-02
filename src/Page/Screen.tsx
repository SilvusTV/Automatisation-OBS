import {useState} from "react";
import getLs from "../utils/getLocalStorage.ts";
import setLs from "../utils/setLocalStorage.ts";
import "../assets/style/screen.css";
import Working from "./Screen/Working.tsx";
import Pause from "./Screen/Pause.tsx";

export default function Screen() {
    const [counter, setCounter] = useState(0);
    const [workingTime, setWorkingTime] = useState(getLs.WORKING_TIME());
    const [pauseTime, setPauseTime] = useState(getLs.PAUSE_TIME());
    const [totalWorkingTime, setTotalWorkingTime] = useState(getLs.TOTAL_TIME());
    const [isWorkScene, setIsWorkScene] = useState(true);
    setInterval(function () {
        setCounter(getLs.COUNTER);
        if (getLs.REFRESH()) {
            window.location.reload();
            setLs.REFRESH(false);
        }
        setWorkingTime(getLs.WORKING_TIME());
        setPauseTime(getLs.PAUSE_TIME());
        setTotalWorkingTime(getLs.TOTAL_TIME());
       setIsWorkScene(getLs.WORKING_SCENE() === getLs.CURRENT_SCENE());
    }, 100);

    const countdownBarWidth = counter / (isWorkScene ? workingTime*60 : pauseTime*60) * 100;
    return (
      isWorkScene ? (
        <Working counter={counter} workingTime={workingTime} pauseTime={pauseTime} totalWorkingTime={totalWorkingTime} countdownBarWidth={countdownBarWidth}/>
      ) : (
        <Pause counter={counter} workingTime={workingTime} pauseTime={pauseTime} countdownBarWidth={countdownBarWidth}/>
      )
    )
}