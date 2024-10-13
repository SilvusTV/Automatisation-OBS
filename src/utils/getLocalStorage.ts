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
    static WORKING_SCENE(): string {
        return localStorage.getItem('WORKING_SCENE') || ''
    }
    static PAUSE_SCENE(): string {
        return localStorage.getItem('PAUSE_SCENE') || ''
    }
    static PAUSE_MICROPHONE(): boolean {
        return localStorage.getItem('PAUSE_MICROPHONE') === 'true'
    }
    static WORKING_MICROPHONE(): boolean {
        return localStorage.getItem('WORKING_MICROPHONE') === 'true'
    }
    static INPUT_SELECTED(): string {
        return localStorage.getItem('INPUT_SELECTED') || ''
    }
    static TOTAL_TIME(): number {
        return parseInt(localStorage.getItem('TOTAL_TIME') || '0')
    }
}