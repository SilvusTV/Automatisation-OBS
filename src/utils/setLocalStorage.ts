export default class setLs{
    static REFRESH(value:boolean) {
       localStorage.setItem('REFRESH', value.toString())
    }
    static WORKING_TIME(value:string) {
       localStorage.setItem('WORKING_TIME', value)
    }
    static PAUSE_TIME(value:string) {
       localStorage.setItem('PAUSE_TIME', value)
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
    static INPUT_SELECTED(value:string) {
       localStorage.setItem('INPUT_SELECTED', value)
    }
    static TOTAL_TIME(value:number) {
       localStorage.setItem('TOTAL_TIME', value.toString())
    }
}