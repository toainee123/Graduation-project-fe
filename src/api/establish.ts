import axiosClient from './axiosClient';
export const getInfoCustomer = async () => {
    const url = `/establish/info-customer`;
    return axiosClient.get(url);
};

export const updateInfoCustomer = async (value: any) => {
    const url = `/establish`;
    return axiosClient.put(url, value);
};

export const getKeyPayment = async () => {
    const url = `/customer/get-key`;
    return axiosClient.get(url);
};

export const postKeyPayment = async (value: any) => {
    const url = `/customer`;
    return axiosClient.post(url, value);
};

export const uploadQrcode = async (file: any) => {
    const url = `/dashboard/upload-file`;
    return axiosClient.post(url, file);
};