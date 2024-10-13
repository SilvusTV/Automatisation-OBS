import {App} from "../Types/App.ts";
import getLs from "./getLocalStorage.ts";

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
export function loadData(e: React.ChangeEvent<HTMLInputElement>){
  const file = e.target.files![0]
  const reader = new FileReader();
  reader.onload = function(e) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const data = JSON.parse(e.target.result as string) as App
    localStorage.setItem('MICROPHONE_SELECTED', data.MicrophoneSelected)
    localStorage.setItem('TOTAL_TIME', data.TotalTime.toString())
    localStorage.setItem('WORKING_MICROPHONE', data.WorkingMicrophone.toString())
    localStorage.setItem('WORKING_SCENE', data.WorkingScene)
    localStorage.setItem('WORKING_TIME', data.WorkingTime.toString())
    localStorage.setItem('PAUSE_MICROPHONE', data.PauseMicrophone.toString())
    localStorage.setItem('PAUSE_SCENE', data.PauseScene)
    localStorage.setItem('PAUSE_TIME', data.PauseTime.toString())
  }
  reader.readAsText(file)
}

export function getData(){
  return {
    MicrophoneSelected: getLs.MICROPHONE_SELECTED(),
    TotalTime: getLs.TOTAL_TIME(),
    WorkingMicrophone: getLs.WORKING_MICROPHONE(),
    WorkingScene: getLs.WORKING_SCENE(),
    WorkingTime: getLs.WORKING_TIME(),
    PauseMicrophone: getLs.PAUSE_MICROPHONE(),
    PauseScene: getLs.PAUSE_SCENE(),
    PauseTime: getLs.PAUSE_TIME()
  } as App
}