import axiosClient from './axiosClient';
export const create = async (house: any) => {
    const url = `/house`;
    return axiosClient.post(url, house);
};

export const get = async () => {
    const url = `/house`;
    return axiosClient.get(url);
};

export const getHouseId = async (id: any) => {
    const url = `/house/${id}`;
    return axiosClient.get(url);
};