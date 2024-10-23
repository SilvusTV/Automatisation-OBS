import {useState} from "react";
import getLs from "../utils/getLocalStorage.ts";
import setLs from "../utils/setLocalStorage.ts";
import {showTime, showTimeWithoutMinutes} from "../utils/utils.ts";

import "../assets/style/screen.css";
import countdownBar from "../assets/videos/countdown-bar-green.webm";
import clsx from "clsx";

export default function Screen() {
    const [counter, setCounter] = useState(0);
    const [workingTime, setWorkingTime] = useState(getLs.WORKING_TIME());
    const [pauseTime, setPauseTime] = useState(getLs.PAUSE_TIME());
    const [isWorkScene, setIsWorkScene] = useState(getLs.IS_WORK_SCENE());
    const [totalWorkingTime, setTotalWorkingTime] = useState(getLs.TOTAL_TIME());
    setInterval(function () {
        setCounter(getLs.COUNTER);
        if (getLs.REFRESH()) {
            window.location.reload();
            setLs.REFRESH(false);
        }
        setWorkingTime(getLs.WORKING_TIME());
        setPauseTime(getLs.PAUSE_TIME());
        setIsWorkScene(getLs.IS_WORK_SCENE());
        setTotalWorkingTime(getLs.TOTAL_TIME());
    }, 250);
    const countdownBarWidth = counter / (isWorkScene ? workingTime*60 : pauseTime*60) * 100;
    return (
      isWorkScene ? (
        <>
          <div className="recap">
            <p className="workingTime">{(workingTime<10) ? "0"+workingTime:workingTime}</p>
            <p className="pauseTime">{pauseTime}</p>
          </div>
          <div className={clsx("totalTimeGroup",getLs.SHOW_WORKING_TIME_MINUTES()&&"two-lines")}>
            <div className={"totalTimeScreen"}>
              <p className={"totalTime"}>{showTimeWithoutMinutes(totalWorkingTime)}H</p>
              <span>
                {getLs.SHOW_WORKING_TIME_MINUTES() &&
                  <p className={"totalTime"}>{showTime(totalWorkingTime).split(":")[1]} {getLs.SHOW_WORKING_TIME_SECONDS() ? "M" : "min"}</p>}
                {getLs.SHOW_WORKING_TIME_SECONDS() && <p className={"totalTime"}>{showTime(totalWorkingTime).split(":")[2]}S</p>}
              </span>
            </div>
            <p className={"separator"}>/</p>
            <p className={"totalTimeGoal"}>{getLs.WORKING_TIME_GOAL()}H</p>
          </div>
            <div className={"countdown"}>
                <p className={"white"}>{showTime(counter).slice(3)}</p>
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
            <p className="workingTime">{(workingTime < 10) ? "0" + workingTime : workingTime}</p>
            <p className="pauseTime">{pauseTime}</p>
          </div>
          <div className={"countdown"}>
                <p>{showTime(counter).slice(3)}</p>
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