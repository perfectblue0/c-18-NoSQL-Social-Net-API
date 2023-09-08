const dayjs = require("dayjs");

// formats date to month, day, year, time
module.exports = (date) => {
    const formattedDate = dayjs(date).format("MMMM D, YYYY h:mma")
    return formattedDate;
}