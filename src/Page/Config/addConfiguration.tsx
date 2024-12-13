// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useReducer, useCallback, useMemo } from "react";
import getLs from "../../utils/getLocalStorage";
import setLs from "../../utils/setLocalStorage";
import { MicOn } from "../../assets/MicOn";
import { MicOff } from "../../assets/MicOff";
import { MusicOn } from "../../assets/MusicOn";
import { MusicOff } from "../../assets/MusicOff";

type ConfigState = {
  pauseTime: number;
  workingTime: number;
  pauseMicrophone: boolean;
  pauseMusic: boolean;
  pauseMusicVolume: number;
  workingMicrophone: boolean;
  workingMusic: boolean;
  workingMusicVolume: number;
  dbPause: number;
};

const initialState: ConfigState = {
  pauseTime: getLs.PAUSE_TIME(),
  workingTime: getLs.WORKING_TIME(),
  pauseMicrophone: getLs.PAUSE_MICROPHONE(),
  pauseMusic: getLs.PAUSE_MUSIC(),
  pauseMusicVolume: getLs.PAUSE_MUSIC_VOLUME(),
  workingMicrophone: getLs.WORKING_MICROPHONE(),
  workingMusic: getLs.WORKING_MUSIC(),
  workingMusicVolume: getLs.WORKING_MUSIC_VOLUME(),
  dbPause: 0,
};

type Action =
  | { type: "update"; key: keyof ConfigState; value: never }
  | { type: "updateVolume"; key: "pauseMusicVolume"; value: number };

function reducer(state: ConfigState, action: Action): ConfigState {
  switch (action.type) {
    case "update":
      setLs[action.key.toUpperCase() as keyof typeof setLs](action.value);
      return { ...state, [action.key]: action.value };
    case "updateVolume":
      // eslint-disable-next-line no-case-declarations
      const a = Math.pow(100, 1 / 100);
      // eslint-disable-next-line no-case-declarations
      const dbPause = parseFloat((-100 * Math.pow(a, action.value) + 1).toFixed(2));
      setLs.PAUSE_MUSIC_VOLUME(action.value);
      return { ...state, pauseMusicVolume: action.value, dbPause };
    default:
      return state;
  }
}

export default function AddConfiguration(props: { sceneList?: string[]; inputList?: string[] }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleUpdate = useCallback(
    (key: keyof ConfigState, value: never) => dispatch({ type: "update", key, value }),
    []
  );

  const handleVolumeUpdate = useCallback(
    (value: number) => dispatch({ type: "updateVolume", key: "pauseMusicVolume", value }),
    []
  );

  const dbPauseLabel = useMemo(() => `${state.dbPause}dB`, [state.dbPause]);

  return (
    <>
      <div className="inputs block">
        <h2>Entrée audios</h2>
        <div className="child-block">
          <label htmlFor="micInput">Microphone</label>
          <select
            name="micInput"
            value={getLs.MICROPHONE_SELECTED()}
            onChange={(event) => setLs.MICROPHONE_SELECTED(event.currentTarget.value)}
          >
            {props.inputList?.map((input, index) => (
              <option key={index}>{input}</option>
            ))}
          </select>

          <label htmlFor="musicInput">Musique</label>
          <select
            name="musicInput"
            value={getLs.MUSIC_SELECTED()}
            onChange={(event) => setLs.MUSIC_SELECTED(event.currentTarget.value)}
          >
            {props.inputList?.map((input, index) => (
              <option key={index}>{input}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="block config">
        <h2>Configuration</h2>
        <div className="child-block list-block">
          {/* Work Configuration */}
          <ConfigurationBlock
            title="Work"
            time={state.workingTime}
            setTime={(value) => handleUpdate("workingTime", value)}
            sceneList={props.sceneList}
            selectedScene={getLs.WORKING_SCENE()}
            setScene={(value) => setLs.WORKING_SCENE(value)}
            microphone={state.workingMicrophone}
            toggleMicrophone={() => handleUpdate("workingMicrophone", !state.workingMicrophone)}
            music={state.workingMusic}
            toggleMusic={() => handleUpdate("workingMusic", !state.workingMusic)}
            volume={state.workingMusicVolume}
            setVolume={(value) => handleUpdate("workingMusicVolume", value)}
          />

          {/* Pause Configuration */}
          <ConfigurationBlock
            title="Pause"
            time={state.pauseTime}
            setTime={(value) => handleUpdate("pauseTime", value)}
            sceneList={props.sceneList}
            selectedScene={getLs.PAUSE_SCENE()}
            setScene={(value) => setLs.PAUSE_SCENE(value)}
            microphone={state.pauseMicrophone}
            toggleMicrophone={() => handleUpdate("pauseMicrophone", !state.pauseMicrophone)}
            music={state.pauseMusic}
            toggleMusic={() => handleUpdate("pauseMusic", !state.pauseMusic)}
            volume={state.pauseMusicVolume}
            setVolume={handleVolumeUpdate}
            dbLabel={dbPauseLabel}
          />
        </div>
      </div>
    </>
  );
}

function ConfigurationBlock(props: {
  title: string;
  time: number;
  setTime: (value: number) => void;
  sceneList?: string[];
  selectedScene: string;
  setScene: (value: string) => void;
  microphone: boolean;
  toggleMicrophone: () => void;
  music: boolean;
  toggleMusic: () => void;
  volume: number;
  setVolume: (value: number) => void;
  dbLabel?: string;
}) {
  return (
    <div className="list-child">
      <p className="title">{props.title}</p>
      <div>
        <span>
          <input
            type="number"
            name={`${props.title.toLowerCase()}Time`}
            value={props.time}
            onChange={(e) => props.setTime(parseInt(e.target.value))}
          />
          <label htmlFor={`${props.title.toLowerCase()}Time`}>min sur la scene</label>
          <select
            name={`${props.title.toLowerCase()}Scene`}
            value={props.selectedScene}
            onChange={(e) => props.setScene(e.target.value)}
          >
            {props.sceneList?.map((scene, index) => (
              <option key={index}>{scene}</option>
            ))}
          </select>
        </span>

        <span className="audio-buttons">
          <button onClick={props.toggleMicrophone}>
            {props.microphone ? <MicOn className="icon" /> : <MicOff className="icon" />}
          </button>
          <button onClick={props.toggleMusic}>
            {props.music ? <MusicOn className="icon" /> : <MusicOff className="icon" />}
          </button>
        </span>

        <span className="volume">
          <label htmlFor={`${props.title.toLowerCase()}Volume`}>
            {props.dbLabel || `${props.volume}dB`}
          </label>
          <input
            type="range"
            min="-100"
            max="0"
            value={props.volume}
            onChange={(e) => props.setVolume(parseInt(e.target.value))}
          />
        </span>
      </div>
    </div>
  );
}
