export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export function toMinutes(time: number) {
  return Math.floor(time * 60)
}
export function showTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
}