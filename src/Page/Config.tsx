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
import {Download} from "../assets/Download.tsx";
import {loadData, saveData} from "../utils/ImportExport.ts";
import {Upload} from "../assets/Upload.tsx";
import {ShowLocalStorage} from "./ShowLocalStorage.tsx";
import {Edit} from "../assets/Edit.tsx";

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
  const [showLocalStorages, setShowLocalStorages] = useState(false);

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
    const input = getLs.MICROPHONE_SELECTED()
    obs.call("SetInputMute", {"inputName": input, "inputMuted": !state})
  }

  return (
    <>
      {connected ? (
          <section className={"configPage"}>
            <div className={"action block"}>
              <h2>Actions</h2>
              <div className={"child-block action-buttons "}>
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
            </div>
            <div className={"countDown block"}>
              <h2>Décompte</h2>
              <div className={"child-block"}>
                <span>
                  <span>
                    <button onClick={() => setCounter(counter - toMinutes(1))}><p>-1</p></button>
                    <button onClick={() => setCounter(counter - toMinutes(2))}><p>-2</p></button>
                    <button onClick={() => setCounter(counter - toMinutes(5))}><p>-5</p></button>
                  </span>
                  <h3>{showTime(counter)}</h3>
                  <span>
                    <button onClick={() => setCounter(counter + toMinutes(1))}><p>+1</p></button>
                    <button onClick={() => setCounter(counter + toMinutes(2))}><p>+2</p></button>
                    <button onClick={() => setCounter(counter + toMinutes(5))}><p>+5</p></button>
                  </span>
              </span>
                <button onClick={() => {
                  setTimePaused(!timePaused)
                }}>
                  {timePaused ? <Play className={"icon"}/> : <Pause className={"icon"}/>}
                </button>

              </div>
            </div>
            <div className={"totalTime block"}>
              <h2>Temps total</h2>
              <div className="child-block">
                <h3>{showSeconds ? showTime(totalTime) : showTimeWithoutSeconds(totalTime)}</h3>
                <span>
                  <button onClick={() => setShowSeconds(!showSeconds)}>
                    <p>Afficher secondes</p>
                    {showSeconds ? <VisibilityOff className={"icon"}/> : <Visibility className={"icon"}/>}
                  </button>
                  <button>
                    <p className={"text-w-icon"}>Modifier <Edit/></p>
                  </button>
                </span>
              </div>

            </div>
            <AddConfiguration sceneList={sceneList} inputList={inputList}/>
          </section>
        ) :
        (
          <section className={"ConnectPage"}>
            <button
              className={"ConnectButton"}
              onClick={() => {
                console.log('connect')
                connect()
              }}
            >
              <p>Connecter</p>
            </button>
            <button
              className={"DownloadButton"}
              onClick={() => {
                saveData()
                setShowLocalStorages(true)
              }}
            >
              <p className={"text-w-icon"}>Exporter les données <Upload className={"icon"}/></p>
              {showLocalStorages && (
                <ShowLocalStorage/>
              )}
            </button>
            <div className={"ImportBloc"}>
              <label htmlFor={"importData"}>
                <span className={"text-w-icon import"}>Importer les données <Download className={"icon"}/></span>
                <input type="file" onChange={loadData} id={"importData"}/>
              </label>
            </div>
          </section>
        )
      }
    </>
  )
}
