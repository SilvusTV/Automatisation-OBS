import {useState} from "react";
import getLs from "../../utils/getLocalStorage.ts";
import setLs from "../../utils/setLocalStorage.ts";
import {MicOn} from "../../assets/MicOn.tsx";
import {MicOff} from "../../assets/MicOff.tsx";
import {MusicOn} from "../../assets/MusicOn.tsx";
import {MusicOff} from "../../assets/MusicOff.tsx";
import clsx from "clsx";

export default function AddConfiguration(props: {
  sceneList?: string[],
  inputList?: string[]
}) {
  const [pauseTime, setPauseTime] = useState<number>(getLs.PAUSE_TIME());
  const [workingTime, setWorkingTime] = useState<number>(getLs.WORKING_TIME());
  const [pauseMicrophone, setPauseMicrophone] = useState<boolean>(getLs.PAUSE_MICROPHONE());
  const [pauseMusic, setPauseMusic] = useState<boolean>(getLs.PAUSE_MUSIC());
  const [pauseMusicVolume, setPauseMusicVolume] = useState<number>(getLs.PAUSE_MUSIC_VOLUME());
  const [workingMicrophone, setWorkingMicrophone] = useState<boolean>(getLs.WORKING_MICROPHONE());
  const [workingMusic, setWorkingMusic] = useState<boolean>(getLs.WORKING_MUSIC());
  const [workingMusicVolume, setWorkingMusicVolume] = useState<number>(getLs.WORKING_MUSIC_VOLUME());
  return (
    <>
      <div className={"inputs block"}>
        <h2>Entrée audios</h2>
        <div className="child-block">
          <label htmlFor={"micInput"}>Microphone</label>
           <select name={"micInput"} onChange={event => setLs.MICROPHONE_SELECTED(event.currentTarget.value)}>
            {props.inputList?.map((input, index) => (
              <option key={index} selected={input === getLs.MICROPHONE_SELECTED()}>{input}</option>
            ))}
          </select>
          <label htmlFor={"musicInput"}>Musique</label>
          <select name={"musicInput"} onChange={event => setLs.MUSIC_SELECTED(event.currentTarget.value)}>
            {props.inputList?.map((input, index) => (
              <option key={index} selected={input === getLs.MUSIC_SELECTED()}>{input}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="block config">
        <h2>Configuration</h2>
        <div className="child-block list-block">
          <div className="list-child">
            <p className="title">Work</p>
            <div>
              <span>
                <input type="number" name={"workingTime"} value={workingTime} onChange={event => {
                  const workingTime = parseInt(event.target.value)
                  setLs.WORKING_TIME(workingTime);
                  setWorkingTime(workingTime)
                }}/>
                <label htmlFor="workingTime">min sur la scene</label>
                <select name={"workingScene"} onChange={event => setLs.WORKING_SCENE(event.currentTarget.value)}>
                  {props.sceneList?.map((scene, index) => (
                    <option key={index} selected={scene === getLs.WORKING_SCENE()}>{scene}</option>
                  ))}
                </select>
              </span>
              <span className={"audio-buttons"}>
                <button onClick={() => {
                  setWorkingMicrophone(!workingMicrophone)
                  setLs.WORKING_MICROPHONE(!workingMicrophone)
                }}>
                  {workingMicrophone ? <MicOn className={"icon"}/> : <MicOff className={"icon"}/>}
                </button>
                <button onClick={() => {
                  setWorkingMusic(!workingMusic)
                  setLs.WORKING_MUSIC(!workingMusic)
                }}>
                  {workingMusic ? <MusicOn className={"icon"}/> : <MusicOff className={"icon"}/>}
                </button>
              </span>
              <span className={"volume"}>
                <label htmlFor="workVolume">{workingMusicVolume}dB</label>
                <input type="range" min="-100" max="0" value={workingMusicVolume} className={clsx(!workingMusic && "disabled")} name={"workVolume"} onChange={event => {
                  setWorkingMusicVolume(parseInt(event.target.value));
                  setLs.WORKING_MUSIC_VOLUME(parseInt(event.target.value))
                }}/>
              </span>
            </div>
          </div>
          <div className="list-child">
            <p className="title">Pause</p>
            <div>
              <span>
                <input type="number" name={"pauseTime"} value={pauseTime} onChange={event => {
                  const pauseTime = parseInt(event.target.value)
                  setLs.PAUSE_TIME(pauseTime);
                  setPauseTime(pauseTime)
                }}/>
                <label htmlFor="pauseTime">min sur la scene</label>
                <select name={"pauseScene"} onChange={event => setLs.PAUSE_SCENE(event.currentTarget.value)}>
                  {props.sceneList?.map((scene, index) => (
                    <option key={index} selected={scene === getLs.PAUSE_SCENE()}>{scene}</option>
                  ))}
                </select>
              </span>
              <span className={"audio-buttons"}>
                <button onClick={() => {
                  setPauseMicrophone(!pauseMicrophone)
                  setLs.PAUSE_MICROPHONE(!pauseMicrophone)
                }}>
                  {pauseMicrophone ? <MicOn className={"icon"}/> : <MicOff className={"icon"}/>}
                </button>
                <button onClick={() => {
                  setPauseMusic(!pauseMusic)
                  setLs.PAUSE_MUSIC(!pauseMusic)
                }}>
                  {pauseMusic ? <MusicOn className={"icon"}/> : <MusicOff className={"icon"}/>}
                </button>
              </span>
              <span className={"volume"}>
                <label htmlFor="pauseVolume">{pauseMusicVolume}dB</label>
                <input type="range" min="-100" max="0" value={pauseMusicVolume}
                       className={clsx(!pauseMusic && "disabled")} name={"pauseVolume"} onChange={event => {
                  setPauseMusicVolume(parseInt(event.target.value));
                  setLs.PAUSE_MUSIC_VOLUME(parseInt(event.target.value))
                }}/>
              </span>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}