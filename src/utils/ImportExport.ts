import {App} from "../Types/App.ts";
import getLs from "./getLocalStorage.ts";
import {ChangeEvent} from "react";
import setLs from "./setLocalStorage.ts";

export function saveData(){

  const data = getData()

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "Pomodoro.json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
export function loadData(e: ChangeEvent<HTMLInputElement>){
  const file = e.target.files![0]
  const reader = new FileReader();
  reader.onload = function(e) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const data = JSON.parse(e.target.result as string) as App
    console.log(data)
    console.log(data.TotalTime)
    console.log(data.TotalTime.toString())
    setLs.MICROPHONE_SELECTED(data.MicrophoneSelected)
    setLs.MUSIC_SELECTED(data.MusicSelected)
    setLs.TOTAL_TIME(data.TotalTime)
    setLs.WORKING_TIME_GOAL(data.WorkingTimeGoal)
    setLs.SHOW_WORKING_TIME_MINUTES(data.ShowWorkingTimeMinutes)
    setLs.SHOW_WORKING_TIME_SECONDS(data.ShowWorkingTimeSeconds)
    setLs.WORKING_MICROPHONE(data.WorkingMicrophone)
    setLs.WORKING_SCENE(data.WorkingScene)
    setLs.WORKING_TIME(data.WorkingTime)
    setLs.WORKING_MUSIC(data.WorkingMusic)
    setLs.WORKING_MUSIC_VOLUME(data.WorkingMusicVolume)
    setLs.PAUSE_MICROPHONE(data.PauseMicrophone)
    setLs.PAUSE_SCENE(data.PauseScene)
    setLs.PAUSE_TIME(data.PauseTime)
    setLs.PAUSE_MUSIC(data.PauseMusic)
    setLs.PAUSE_MUSIC_VOLUME(data.PauseMusicVolume)
  }
  reader.readAsText(file)
}

export function getData(){
  return {
    MicrophoneSelected: getLs.MICROPHONE_SELECTED(),
    MusicSelected: getLs.MUSIC_SELECTED(),
    TotalTime: getLs.TOTAL_TIME(),
    WorkingTimeGoal: getLs.WORKING_TIME_GOAL(),
    ShowWorkingTimeMinutes: getLs.SHOW_WORKING_TIME_MINUTES(),
    ShowWorkingTimeSeconds: getLs.SHOW_WORKING_TIME_SECONDS(),
    WorkingMicrophone: getLs.WORKING_MICROPHONE(),
    WorkingScene: getLs.WORKING_SCENE(),
    WorkingTime: getLs.WORKING_TIME(),
    WorkingMusic: getLs.WORKING_MUSIC(),
    WorkingMusicVolume: getLs.WORKING_MUSIC_VOLUME(),
    PauseMicrophone: getLs.PAUSE_MICROPHONE(),
    PauseScene: getLs.PAUSE_SCENE(),
    PauseTime: getLs.PAUSE_TIME(),
    PauseMusic: getLs.PAUSE_MUSIC(),
    PauseMusicVolume: getLs.PAUSE_MUSIC_VOLUME(),
  } as App
}