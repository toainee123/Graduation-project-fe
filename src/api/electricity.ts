import axiosClient from './axiosClient';
export const getListIndexElectricity = async (date: any) => {
    console.log(date);

    const url = `electricity?date=${date}`;
    return axiosClient.get(url);
};