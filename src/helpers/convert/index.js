export const convertDate = (timestamps) => {
    const date = new Date(timestamps)
    const [day, month, year] = [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
    ]
    return `${day}/${month}/${year}`
}

export const convertDateTime = (timestamps) => {
    const date = new Date(timestamps)
    const [hour, minute, second, day, month, year] = [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
    ]
    return `${hour}:${minute}:${second} ${day}/${month}/${year}`
}

function timestrToSec(timestr) {
    const parts = timestr.split(':')
    return parts[0] * 3600 + parts[1] * 60
}

function pad(num) {
    if (num < 10) {
        return '0' + num
    } else {
        return '' + num
    }
}

function formatTime(seconds) {
    return [
        pad(Math.floor(seconds / 3600)),
        pad(Math.floor(seconds / 60) % 60),
    ].join(':')
}

// startTime: 06:00, endTime 22:00
const getRangeTime = (_startTime, _endTime) => {
    let start = _startTime
    let end = ''
    const ranges = []
    do {
        ranges.push(start)
        end = formatTime(timestrToSec(start) + 30 * 60) // start: 06:00 -> end: 06:30
        start = end
    } while (timestrToSec(end) <= timestrToSec(_endTime))
    return ranges
}

export { getRangeTime, timestrToSec }
