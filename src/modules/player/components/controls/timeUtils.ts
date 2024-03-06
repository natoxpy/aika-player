export function FormatTime(time: number) {
    if (time == 0 || isNaN(time)) return '0:00'
    const minutes = Math.round(time / 60)
    let seconds = Math.round(time % 60)

    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}
