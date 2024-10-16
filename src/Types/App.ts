export type App = {
  //Global
  MicrophoneSelected: string;
  MusicSelected: string;
  TotalTime: number;
  //Work
  WorkingMicrophone: boolean;
  WorkingScene: string;
  WorkingTime: number;
  WorkingMusic:boolean;
  WorkingMusicVolume:number;
  //Pause
  PauseMicrophone: boolean;
  PauseScene: string;
  PauseTime: number;
  PauseMusic:boolean;
  PauseMusicVolume:number;
}