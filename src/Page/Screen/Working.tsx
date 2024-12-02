import clsx from "clsx";
import getLs from "../../utils/getLocalStorage.ts";
import {showTime, showTimeWithoutMinutes} from "../../utils/utils.ts";
import countdownBar from "../../assets/videos/countdown-bar-green.webm";

type ScreenWorkingProps = {
  counter: number;
  workingTime: number;
  pauseTime: number;
  totalWorkingTime: number;
  countdownBarWidth: number;
}
export default function Working(props: ScreenWorkingProps) {
  return (
    <>
      <div className="recap">
        <p className="workingTime">{(props.workingTime < 10) ? "0" + props.workingTime : props.workingTime}</p>
        <p className="pauseTime">{props.pauseTime}</p>
      </div>
      <div className={clsx("totalTimeGroup", getLs.SHOW_WORKING_TIME_MINUTES() && "two-lines")}>
        <div className={"totalTimeScreen"}>
          <p className={"totalTime"}>{showTimeWithoutMinutes(props.totalWorkingTime)}H</p>
          <span>
                {getLs.SHOW_WORKING_TIME_MINUTES() &&
                  <p
                    className={"totalTime"}>{showTime(props.totalWorkingTime).split(":")[1]} {getLs.SHOW_WORKING_TIME_SECONDS() ? "M" : "min"}</p>}
            {getLs.SHOW_WORKING_TIME_SECONDS() &&
              <p className={"totalTime"}>{showTime(props.totalWorkingTime).split(":")[2]}S</p>}
              </span>
        </div>
        <p className={"separator"}>/</p>
        <p className={"totalTimeGoal"}>{getLs.WORKING_TIME_GOAL()}H</p>
      </div>
      <div className={"countdown"}>
        <p className={"white"}>{showTime(props.counter).slice(3)}</p>
        <style>
          {`
                    .countdown-bar > video, .countdown-bar:before {
                        width: ${props.countdownBarWidth}%;
                    }
                  `}
        </style>
        <div className={"countdown-bar"}>
          <video src={countdownBar} autoPlay={true} loop={true}></video>
        </div>
      </div>
    </>
  )
}