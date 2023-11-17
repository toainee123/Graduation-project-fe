import axiosClient from './axiosClient';
export const getListIndexElectricity = async (date: any) => {
    console.log(date);
    const url = `electricity?date=${date}`;
    return axiosClient.get(url);
};

export const getListIndexElectricityUser = async (date: any) => {
    const url = `electricity/user?date=${date}`;
    console.log(url);

    return axiosClient.get(url);
};