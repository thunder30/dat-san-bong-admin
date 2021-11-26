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
