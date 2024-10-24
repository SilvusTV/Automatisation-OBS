export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export function toMinutes(time: number) {
  return Math.floor(time * 60)
}
export function showTime(time: number) {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time / 60) % 60)
  const seconds = time % 60
  return (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}
export function showTimeWithoutSeconds(time: number) {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time / 60) % 60)
  return (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes
}
export function showTimeWithoutMinutes(time: number) {
  return Math.floor(time / 3600)
}