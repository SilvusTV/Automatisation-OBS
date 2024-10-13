import {useState} from "react";
import getLs from "../../utils/getLocalStorage.ts";
import setLs from "../../utils/setLocalStorage.ts";
import {MicOn} from "../../assets/MicOn.tsx";
import {MicOff} from "../../assets/MicOff.tsx";

export default function AddConfiguration(props: {
  sceneList?: string[],
  inputList?: string[]
}) {
  const [pauseTime, setPauseTime] = useState<number>(getLs.PAUSE_TIME());
  const [workingTime, setWorkingTime] = useState<number>(getLs.WORKING_TIME());
  const [pauseMicrophone, setPauseMicrophone] = useState<boolean>(getLs.PAUSE_MICROPHONE());
  const [workingMicrophone, setWorkingMicrophone] = useState<boolean>(getLs.WORKING_MICROPHONE());
  return (
    <div>
      <h1>Config</h1>
      <div>
        <label htmlFor={"micInput"}>Microphone Input</label>
        <select name={"micInput"} onChange={event => setLs.INPUT_SELECTED(event.currentTarget.value)}>
          {props.inputList?.map((input, index) => (
            <option key={index} selected={input === getLs.INPUT_SELECTED()}>{input}</option>
          ))}
        </select>
      </div>
      <div>
        <h2>Working time</h2>
        <input type="number" value={workingTime} onChange={event => {
          setLs.WORKING_TIME(event.target.value);
          setWorkingTime(parseInt(event.target.value))
        }}/>
        <select onChange={event => setLs.WORKING_SCENE(event.currentTarget.value)}>
          {props.sceneList?.map((scene, index) => (
            <option key={index} selected={scene===getLs.WORKING_SCENE()}>{scene}</option>
          ))}
        </select>
        <button onClick={()=>{
          setWorkingMicrophone(!workingMicrophone)
          setLs.WORKING_MICROPHONE(!workingMicrophone)
        }}>
          {workingMicrophone ? <MicOn className={"icon"}/> : <MicOff className={"icon"}/>}
        </button>
      </div>
      <div>
        <h2>Pause time</h2>
        <input type="number" value={pauseTime} onChange={event => {
          setLs.PAUSE_TIME(event.target.value);
          setPauseTime(parseInt(event.target.value))
        }}/>
        <select onChange={event => setLs.PAUSE_SCENE(event.currentTarget.value)} >
          {props.sceneList?.map((scene, index) => (
            <option key={index} selected={scene===getLs.PAUSE_SCENE()}>{scene}</option>
          ))}
        </select>
        <button onClick={()=>{
          setLs.PAUSE_MICROPHONE(!pauseMicrophone)
          setPauseMicrophone(!pauseMicrophone)
        }}>
          {pauseMicrophone ? <MicOn className={"icon"}/> : <MicOff className={"icon"}/>}
        </button>
      </div>
    </div>
  )
}