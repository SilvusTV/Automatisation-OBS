import {useState} from "react";
import getLs from "../utils/getLocalStorage.ts";
import setLs from "../utils/setLocalStorage.ts";
import {showTime} from "../utils/utils.ts";

import "../assets/style/screen.css";
import countdownBar from "../assets/videos/countdown-bar-green.webm";

export default function Screen() {
    const [counter, setCounter] = useState(0);
    const [workingTime, setWorkingTime] = useState(getLs.WORKING_TIME());
    const [pauseTime, setPauseTime] = useState(getLs.PAUSE_TIME());
    const [isWorkScene, setIsWorkScene] = useState(getLs.IS_WORK_SCENE());
    setInterval(function () {
        setCounter(getLs.COUNTER);
        if (getLs.REFRESH()) {
            window.location.reload();
            setLs.REFRESH(false);
        }
        setWorkingTime(getLs.WORKING_TIME());
        setPauseTime(getLs.PAUSE_TIME());
        setIsWorkScene(getLs.IS_WORK_SCENE());
    }, 250);

    const countdownBarWidth = counter / (isWorkScene ? workingTime*60 : pauseTime*60) * 100;
    return (
      isWorkScene ? (
        <>
            <div className="recap">
                <p className="workingTime">{(workingTime<10) ? "0"+workingTime:workingTime}</p>
                <p className="pauseTime">{pauseTime}</p>
            </div>
            <div className={"countdown"}>
                <p className={"white"}>{showTime(counter)}</p>
                <style>
                    {`
                    .countdown-bar > video, .countdown-bar:before {
                        width: ${countdownBarWidth}%;
                    }
                  `}
                </style>
                <div className={"countdown-bar"}>
                    <video src={countdownBar} autoPlay={true} loop={true}></video>
                </div>
            </div>
        </>
      ) : (
        <section className={"page-pause"}>
          <div className="recap">
            <p className="workingTime">{workingTime}</p>
            <p className="pauseTime">{pauseTime}</p>
          </div>
          <div className={"countdown"}>
                <p>{showTime(counter)}</p>
                <style>
                    {`
                    .countdown-bar > video, .countdown-bar:before {
                        width: ${countdownBarWidth}%;
                    }
                  `}
                    </style>
                    <div className={"countdown-bar"}>
                        <video src={countdownBar} autoPlay={true} loop={true}></video>
                    </div>
                </div>
        </section>
      )
    )
}