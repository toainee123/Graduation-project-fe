import axiosClient from './axiosClient';

export const getListHouse = async () => {
    const url = `http://localhost:5000/api/house`;
    // const url = `/house`;
    return axiosClient.get(url);
};

export const createHouse = async (data: any) => {
    const url = `http://localhost:5000/api/depositss`;
    return axiosClient.post(url, data);
};

