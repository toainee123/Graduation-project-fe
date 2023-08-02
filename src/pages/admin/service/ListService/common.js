export const convertStringToStringsNoDecimal = (value) => value ? parseInt(value, 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0
