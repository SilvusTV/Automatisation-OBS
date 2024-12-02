import {showTime} from "../../utils/utils.ts";
import countdownBar from "../../assets/videos/countdown-bar-green.webm";

type ScreenPauseProps = {
  workingTime: number;
  pauseTime: number;
  counter: number;
  countdownBarWidth: number;
}

export default function Pause(props: ScreenPauseProps) {
  return (
    <section className={"page-pause"}>
      <div className="recap">
        <p className="workingTime">{(props.workingTime < 10) ? "0" + props.workingTime : props.workingTime}</p>
        <p className="pauseTime">{props.pauseTime}</p>
      </div>
      <div className={"countdown"}>
        <p>{showTime(props.counter).slice(3)}</p>
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
    </section>
  )
}