
export const convertDate = (date: any) => {
    const convert = new Date(date); // Create a new Date object with the current date and time

    // Extract individual date components
    const year = convert.getFullYear();
    const month = convert.getMonth() + 1; // Months are zero-based, so add 1
    const day = convert.getDate();

    // Format the date as "YYYY-MM-DD"
    return `${day}-${month}-${year}`

}
export const convertDateFilter = (date: any): any => {
    console.log('date', date);
    const convert = new Date(date); // Create a new Date object with the current date and time
    console.log('convert', convert);

    // Extract individual date components
    const year = convert.getFullYear();
    const month = convert.getMonth() + 1; // Months are zero-based, so add 1
    const day = convert.getDate();

    // Format the date as "YYYY-MM-DD"
    return `${year}-${month}-${day}`

}