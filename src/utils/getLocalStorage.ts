export default class getLs{
  
    static REFRESH(): boolean {
        return localStorage.getItem('REFRESH') === 'true'
    }
    static WORKING_TIME(): number {
        return parseInt(localStorage.getItem('WORKING_TIME') || '0')
    }
    static PAUSE_TIME(): number {
        return parseInt(localStorage.getItem('PAUSE_TIME') || '0')
    }
    static COUNTER(): number {
        return parseInt(localStorage.getItem('COUNTER') || '0')
    }
    static CONNECTED(): boolean {
        return localStorage.getItem('CONNECTED') === 'true'
    }
}