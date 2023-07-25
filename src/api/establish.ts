import axiosClient from './axiosClient';
export const getInfoCustomer = async () => {
    const url = `/establish/info-customer`;
    return axiosClient.get(url);
};

export const updateInfoCustomer = async (value: any) => {
    const url = `/establish`;
    return axiosClient.put(url, value);
};