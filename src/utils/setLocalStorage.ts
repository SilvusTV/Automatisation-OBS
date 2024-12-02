import {ObsCredential} from "../Types/Credential.ts";

export default class setLs{
    static REFRESH(value:boolean) {
       localStorage.setItem('REFRESH', value.toString())
    }
    static WORKING_TIME(value:number) {
       localStorage.setItem('WORKING_TIME', value.toString())
    }
    static PAUSE_TIME(value:number) {
       localStorage.setItem('PAUSE_TIME', value.toString())
    }
    static COUNTER(value:number) {
       localStorage.setItem('COUNTER', value.toString())
    }
    static CONNECTED(value:boolean) {
       localStorage.setItem('CONNECTED', value.toString())
    }
    static WORKING_SCENE(value:string) {
       localStorage.setItem('WORKING_SCENE', value)
    }
    static PAUSE_SCENE(value:string) {
       localStorage.setItem('PAUSE_SCENE', value)
    }
    static PAUSE_MICROPHONE(value:boolean) {
       localStorage.setItem('PAUSE_MICROPHONE', value.toString())
    }
    static WORKING_MICROPHONE(value:boolean) {
       localStorage.setItem('WORKING_MICROPHONE', value.toString())
    }
    static MICROPHONE_SELECTED(value:string) {
       localStorage.setItem('MICROPHONE_SELECTED', value)
    }
    static MUSIC_SELECTED(value:string) {
       localStorage.setItem('MUSIC_SELECTED', value)
    }
    static TOTAL_TIME(value:number) {
       localStorage.setItem('TOTAL_TIME', value.toString())
    }
    static WORKING_MUSIC(value:boolean) {
       localStorage.setItem('WORKING_MUSIC', value.toString())
    }
    static WORKING_MUSIC_VOLUME(value:number) {
       localStorage.setItem('WORKING_MUSIC_VOLUME', value.toString())
    }
    static PAUSE_MUSIC(value:boolean) {
       localStorage.setItem('PAUSE_MUSIC', value.toString())
    }
    static PAUSE_MUSIC_VOLUME(value:number) {
       localStorage.setItem('PAUSE_MUSIC_VOLUME', value.toString())
    }
    static WORKING_TIME_GOAL(value:number) {
       localStorage.setItem('WORKING_TIME_GOAL', value.toString())
    }
    static SHOW_WORKING_TIME_MINUTES(value:boolean) {
       localStorage.setItem('SHOW_WORKING_TIME_MINUTES', value.toString())
    }
    static SHOW_WORKING_TIME_SECONDS(value:boolean) {
       localStorage.setItem('SHOW_WORKING_TIME_SECONDS', value.toString())
    }
    static CREDENTIAL(value:ObsCredential) {
        localStorage.setItem('CREDENTIAL', JSON.stringify(value))
    }
    static CURRENT_SCENE(value:string) {
        localStorage.setItem('CURRENT_SCENE', value)
    }
}