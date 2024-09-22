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
}