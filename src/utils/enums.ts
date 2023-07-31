export const enums = {}

export const convertDateAntd = (date: any) => {
    const getDate = date._d

    const newDay = new Date(getDate);

    const year = newDay.getFullYear();
    const month = newDay.getMonth() + 1; // Months are zero-based, so add 1
    const day = newDay.getDate();

    return `${year}-${month}-${day}`
}