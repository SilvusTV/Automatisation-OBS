import OBSWebSocket from "obs-websocket-js";
import {useEffect, useState} from "react";
import {getInputList, getObs, getSceneList} from "../utils/obs.ts";
import setLs from "../utils/setLocalStorage.ts";
import AddConfiguration from "./Config/addConfiguration.tsx";
import getLs from "../utils/getLocalStorage.ts";
import {showTime, showTimeWithoutSeconds, toMinutes} from "../utils/utils.ts";
import {Play} from "../assets/Play.tsx";
import {Pause} from "../assets/Pause.tsx";
import {VisibilityOff} from "../assets/VisibilityOff.tsx";
import {Visibility} from "../assets/Visibility.tsx";

export default function Config() {
  const [connected, setConnected] = useState<boolean>(false);
  const [obs, setObs] = useState<OBSWebSocket>(new OBSWebSocket());
  const [workScene, setWorkScene] = useState(true);
  const workingTime = toMinutes(getLs.WORKING_TIME());
  const pauseTime = toMinutes(getLs.PAUSE_TIME());
  const [counter, setCounter] = useState(workingTime);
  const [refresh, setRefresh] = useState(false);
  const [sceneList, setSceneList] = useState<string[]>();
  const [inputList, setInputList] = useState<string[]>();
  const [totalTime, setTotalTime] = useState(getLs.TOTAL_TIME());
  const [timePaused, setTimePaused] = useState(false);
  const [showSeconds, setShowSeconds] = useState(false);

  setInterval(function () {
    if (getLs.REFRESH()) {
      setRefresh(true);
      setLs.REFRESH(false);
    }
  }, 250);

  useEffect(() => {
    setRefresh(false)
    if (connected) {
      if (!timePaused) {
        setTotalTime(totalTime + 1)
        setLs.TOTAL_TIME(totalTime + 1)
        setLs.COUNTER(counter)
        const timer = counter >= 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => {
          clearInterval(timer as number)
          if (counter === 0) {
            if (workScene) {
              setCounter(pauseTime)
              setWorkScene(false)
              changeScene(getLs.PAUSE_SCENE())
              changeMicrophoneState(getLs.PAUSE_MICROPHONE())
            } else {
              setCounter(workingTime)
              setWorkScene(true)
              changeScene(getLs.WORKING_SCENE())
              changeMicrophoneState(getLs.WORKING_MICROPHONE())
            }
          }
        };
      }
    }
  }, [counter, connected, refresh, timePaused]);

  async function connect() {
    setObs(await getObs())
    setConnected(true);
    setLs.CONNECTED(true)
  }

  function changeScene(scene: string) {
    obs.call("SetCurrentProgramScene", {"sceneName": scene})
  }

  function changeMicrophoneState(state: boolean) {
    const input = getLs.INPUT_SELECTED()
    obs.call("SetInputMute", {"inputName": input, "inputMuted": !state})
  }

  return (
    <>
      {connected ? (
          <>
            <div>
              <button onClick={() => {
                obs.disconnect().then(() => {
                  setConnected(false)
                  setLs.CONNECTED(false)
                })
              }}>
                Disconnect
              </button>
              <button onClick={() => {
                setLs.REFRESH(true)
                getSceneList(obs).then((sceneList) => {
                  setSceneList(sceneList.scenes.map(scene => scene.sceneName))
                })

                getInputList(obs).then((inputList) => {
                  setInputList(inputList.inputs.map(input => input.inputName))
                })
              }}>
                Refresh
              </button>
            </div>
            <div className={"countDown"}>
              <span>
                <p>Countdown: {showTime(counter)}</p>
                <button onClick={()=>{setTimePaused(!timePaused)}}>
                  {timePaused ? <Play className={"icon"}/> : <Pause className={"icon"}/>}
                </button>
              </span>
              <button onClick={() => setCounter(counter + toMinutes(1))}><p>+1</p></button>
              <button onClick={() => setCounter(counter + toMinutes(5))}><p>+5</p></button>
            </div>
            <div>
              <button onClick={()=>setShowSeconds(!showSeconds)}>
                <p>Total time: {showSeconds? showTime(totalTime) : showTimeWithoutSeconds(totalTime) }</p>
                {showSeconds ? <VisibilityOff className={"icon"}/> : <Visibility className={"icon"}/>}
              </button>
            </div>
            <AddConfiguration sceneList={sceneList} inputList={inputList}/>
          </>
        ) :
        (
          <button
            onClick={() => {
              console.log('connect')
              connect()
            }}
          >
            Connecter
          </button>
        )
      }
    </>
  )
}
