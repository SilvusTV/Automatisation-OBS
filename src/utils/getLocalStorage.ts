import {ObsCredential} from "../Types/Credential.ts";

export default class getLs {

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

  static MICROPHONE_SELECTED(): string {
    return localStorage.getItem('MICROPHONE_SELECTED') || ''
  }

  static MUSIC_SELECTED(): string {
    return localStorage.getItem('MUSIC_SELECTED') || ''
  }

  static TOTAL_TIME(): number {
    return parseInt(localStorage.getItem('TOTAL_TIME') || '0')
  }

  static WORKING_MUSIC(): boolean {
    return localStorage.getItem('WORKING_MUSIC') === 'true'
  }

  static WORKING_MUSIC_VOLUME(): number {
    return parseInt(localStorage.getItem('WORKING_MUSIC_VOLUME') || '0')
  }

  static PAUSE_MUSIC(): boolean {
    return localStorage.getItem('PAUSE_MUSIC') === 'true'
  }

  static PAUSE_MUSIC_VOLUME(): number {
    return parseInt(localStorage.getItem('PAUSE_MUSIC_VOLUME') || '0')
  }

  static IS_WORK_SCENE(): boolean {
    return localStorage.getItem('IS_WORK_SCENE') === 'true'
  }

  static WORKING_TIME_GOAL(): number {
    return parseInt(localStorage.getItem('WORKING_TIME_GOAL') || '0')
  }

  static SHOW_WORKING_TIME_MINUTES(): boolean {
    return localStorage.getItem('SHOW_WORKING_TIME_MINUTES') === 'true'
  }

  static SHOW_WORKING_TIME_SECONDS(): boolean {
    return localStorage.getItem('SHOW_WORKING_TIME_SECONDS') === 'true'
  }

  static CREDENTIAL(): ObsCredential | null {
    if (localStorage.getItem('CREDENTIAL') === null) {
      return null
    } else {
      return JSON.parse(localStorage.getItem('CREDENTIAL')!) as ObsCredential
    }
  }
}