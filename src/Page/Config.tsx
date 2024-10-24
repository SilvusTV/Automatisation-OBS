import OBSWebSocket from "obs-websocket-js";
import {useEffect, useState} from "react";
import {getInputList, getObs, getSceneList} from "../utils/obs.ts";
import setLs from "../utils/setLocalStorage.ts";
import AddConfiguration from "./Config/addConfiguration.tsx";
import getLs from "../utils/getLocalStorage.ts";
import {showTime, showTimeWithoutMinutes, showTimeWithoutSeconds, toMinutes} from "../utils/utils.ts";
import {Play} from "../assets/Play.tsx";
import {Pause} from "../assets/Pause.tsx";
import {VisibilityOff} from "../assets/VisibilityOff.tsx";
import {Visibility} from "../assets/Visibility.tsx";
import {Download} from "../assets/Download.tsx";
import {loadData, saveData} from "../utils/ImportExport.ts";
import {Upload} from "../assets/Upload.tsx";
import {ShowLocalStorage} from "./ShowLocalStorage.tsx";
import {Edit} from "../assets/Edit.tsx";

import "../assets/style/config.css";
import {ObsCredential} from "../Types/Credential.ts";

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
  const [showMinutes, setShowMinutes] = useState(false);
  const [showLocalStorages, setShowLocalStorages] = useState(false);
  const [updateTotalTime, setUpdateTotalTime] = useState(false);
  const [updateHour, setUpdateHour] = useState(showTime(totalTime).split(":")[0]);
  const [updateMin, setUpdateMin] = useState(showTime(totalTime).split(":")[1]);
  const [workingTimeGoal, setWorkingTimeGoal] = useState(getLs.WORKING_TIME_GOAL());
  const [host, setHost] = useState("localhost");
  const [port, setPort] = useState(4455);
  const [password, setPassword] = useState("")

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
        const timer = setInterval(() => setCounter(counter - 1), 1000);
        return () => {
          clearInterval(timer as number)
          if (counter <= 0) {
            if (workScene) {
              setCounter(pauseTime)
              setWorkScene(false)
              setLs.IS_WORK_SCENE(false)
              changeScene(getLs.PAUSE_SCENE())
              changeMicrophoneState(getLs.PAUSE_MICROPHONE())
              changeMusicVolume(getLs.PAUSE_MUSIC(), getLs.PAUSE_MUSIC_VOLUME())
            } else {
              setCounter(workingTime)
              setWorkScene(true)
              setLs.IS_WORK_SCENE(true)
              changeScene(getLs.WORKING_SCENE())
              changeMicrophoneState(getLs.WORKING_MICROPHONE())
              changeMusicVolume(getLs.WORKING_MUSIC(), getLs.WORKING_MUSIC_VOLUME())
            }
          }
        };
      }
    }
  }, [counter, connected, refresh, timePaused]);

  async function connect(credentials: ObsCredential) {
    setObs(await getObs(credentials))
    console.log('connect')
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

  function changeMusicVolume(state: boolean, volume: number) {
    const input = getLs.MUSIC_SELECTED()
    obs.call("SetInputMute", {"inputName": input, "inputMuted": !state})
    obs.call("SetInputVolume", {"inputName": input, "inputVolumeDb": volume})
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
                  <h3>{showTime(counter).slice(3)}</h3>
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
                <h3>{
                  showSeconds ?
                    showTime(totalTime) :
                    showMinutes ?
                      showTimeWithoutSeconds(totalTime) :
                      showTimeWithoutMinutes(totalTime) + " H"
                }</h3>
                <span>
                  <button onClick={() => {
                    setShowMinutes(!showMinutes)
                    setLs.SHOW_WORKING_TIME_MINUTES(!showMinutes)
                    setShowSeconds(false)
                    setLs.SHOW_WORKING_TIME_SECONDS(false)
                  }}
                  >
                    <p>Afficher minutes</p>
                    {showMinutes ? <VisibilityOff className={"icon"}/> : <Visibility className={"icon"}/>}
                  </button>
                  {showMinutes && (
                    <button onClick={() => {
                      setShowSeconds(!showSeconds)
                      setLs.SHOW_WORKING_TIME_SECONDS(!showSeconds)
                    }}
                    >
                      <p>Afficher secondes</p>
                      {showSeconds ? <VisibilityOff className={"icon"}/> : <Visibility className={"icon"}/>}
                    </button>
                  )}
                  <button onClick={() => setUpdateTotalTime(!updateTotalTime)}>
                    <p className={"text-w-icon"}>Modifier <Edit/></p>
                  </button>
                </span>
                {updateTotalTime && (
                  <div>
                    <span className="input">
                      <input name={"hour"}
                             type="number"
                             value={updateHour}
                             onChange={e => setUpdateHour(e.target.value)}
                             defaultValue={showTime(totalTime).split(":")[0]}
                      />
                      <label htmlFor="hour">heures</label>
                      <input name={"min"}
                             type="number"
                             value={updateMin}
                             onChange={e => setUpdateMin(e.target.value)}
                             defaultValue={showTime(totalTime).split(":")[1]}
                      />
                      <label htmlFor="min">minutes</label>
                    </span>
                    <span className="action">
                      <button onClick={() => {
                        const newTotalTime = (parseInt(updateHour) * 60 + parseInt(updateMin)) * 60
                        setTotalTime(newTotalTime)
                        setLs.TOTAL_TIME(newTotalTime)
                        setUpdateTotalTime(false)
                      }}>Valider</button>
                      <button onClick={() => setUpdateTotalTime(false)}>Annuler</button>
                    </span>
                  </div>
                )}
                <span className="totalTimeGoal">
                  <span>
                    <label>Objectif de temps de travail : </label>
                    <input type="number"
                           value={workingTimeGoal}
                           onChange={e => {
                             setWorkingTimeGoal(parseInt(e.target.value))
                             setLs.WORKING_TIME_GOAL(parseInt(e.target.value))
                           }}
                    />
                    <label>heures</label>
                  </span>
                </span>
              </div>

            </div>
            <AddConfiguration sceneList={sceneList} inputList={inputList}/>
          </section>
        ) :
        (
          <section className={"ConnectPage"}>
            {getLs.CREDENTIAL() ? null : (
              <div className="connexion">
                <span>
                  <input placeholder={"host"} type="text" name={"host"} defaultValue={"localhost"} value={host}
                         onChange={e => setHost(e.target.value)}/>
                  <input placeholder={"port"} type="number" name={"port"} defaultValue={"4455"} value={port}
                         onChange={e => setPort(parseInt(e.target.value))}/>
                </span>
                <input placeholder={"password"} type="password" name={"password"} value={password}
                       onChange={e => setPassword(e.target.value)}/>
              </div>
            )}
            <button
              className={"ConnectButton"}
              onClick={() => {
                if (getLs.CREDENTIAL()) {
                  connect(getLs.CREDENTIAL()!)
                } else {
                  const credential: ObsCredential = {
                    host: host,
                    port: port,
                    password: password
                  }
                  setLs.CREDENTIAL(credential)
                  connect(credential)
                }
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
