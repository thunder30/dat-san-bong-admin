export default function convertStringToDate(endTime) {
    // 12/11/2023 11:00
    const endTimeArrayAdd = endTime.split(' ')
    const endDate = endTimeArrayAdd[0].split('/')
    const endTimeArray2Add = endTimeArrayAdd[1].split(':')
    const endDateTimeAdd = new Date(
        endDate[2],
        endDate[1] - 1,
        endDate[0],
        endTimeArray2Add[0],
        endTimeArray2Add[1]
    )

    return endDateTimeAdd
}
