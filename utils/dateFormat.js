const dayjs = require("dayjs");

module.exports = (date) => {
    const formattedDate = dayjs(date).format("MMMM D, YYYY h:mma")
    return formattedDate;
}