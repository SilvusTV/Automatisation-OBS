import OBSWebSocket from "obs-websocket-js";
import {useEffect, useState} from "react";
import {getInputList, getObs, getSceneList} from "../utils/obs.ts";
import setLs from "../utils/setLocalStorage.ts";
import AddConfiguration from "./Config/addConfiguration.tsx";
import getLs from "../utils/getLocalStorage.ts";

export default function Config() {
  const [connected, setConnected] = useState<boolean>(false);
  const [obs, setObs] = useState<OBSWebSocket>(new OBSWebSocket());
  const [workScene, setWorkScene] = useState(true);
  const workingTime = getLs.WORKING_TIME();
  const pauseTime = getLs.PAUSE_TIME();
  const [counter, setCounter] = useState(workingTime);
  const [refresh, setRefresh] = useState(false);
  const [sceneList, setSceneList] = useState<string[]>();
  const [inputList, setInputList] = useState<string[]>();

  setInterval(function () {
    if (getLs.REFRESH()) {
      setRefresh(true);
      setLs.REFRESH(false);
    }
  }, 250);

  useEffect(() => {
    setRefresh(false)
    if (connected) {
      const timer = counter >= 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => {
        clearInterval(timer as number)
        setLs.COUNTER(counter)
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
  }, [counter, connected, refresh]);

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
