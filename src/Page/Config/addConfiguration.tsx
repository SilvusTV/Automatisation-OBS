import {useState} from "react";
import getLs from "../../utils/getLocalStorage.ts";
import setLs from "../../utils/setLocalStorage.ts";

export default function AddConfiguration(props: {
  sceneList?: string[],
  setSceneList: React.Dispatch<React.SetStateAction<string[] | undefined>>,
}) {
  const [pauseTime, setPauseTime] = useState<number>(getLs.PAUSE_TIME());
  const [workingTime, setWorkingTime] = useState<number>(getLs.WORKING_TIME());
  return (
    <div>
      <h1>Config</h1>
      <div>
        <label>Working time</label>
        <input type="number" value={workingTime} onChange={event => {
          setLs.WORKING_TIME(event.target.value);
          setWorkingTime(parseInt(event.target.value))
        }}/>
        <select></select>
      </div>
      <div>
        <label>Pause time</label>
        <input type="number" value={pauseTime} onChange={event => {
          setLs.PAUSE_TIME(event.target.value);
          setPauseTime(parseInt(event.target.value))
        }}/>
        <select></select>

      </div>
      <button>Save</button>
    </div>
  )
}