const monthMap = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
}

function getFormattedDate(dateString) {
    return `${dateString.substring(8, 10)} ${monthMap[dateString.substring(5, 7)]}`
}

export { getFormattedDate };