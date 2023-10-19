export const  convertDate = (date:string) =>{

    const [day, month, year] = date.split('-').map(Number);
    const jsDate = new Date(Date.UTC(year, month - 1, day))
    console.log(jsDate); // This will print the date as a JavaScript Date object
    return jsDate;
}


// const { DateTime } = require("luxon");

// const dateString = "2023-10-13T05:36:48.269+00:00";
// const dateTime = DateTime.fromISO(dateString, { setZone: true });

// console.log(dateTime.toJSDate()); // This will print the date as a JavaScript Date object
