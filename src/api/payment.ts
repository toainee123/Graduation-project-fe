import axiosClient from "./axiosClient";

export const createUrlPayment = (idroom: any, value: any) => {
    const url = `/bill/create_payment_url?id=${idroom}`;
    return axiosClient.post(url, value);
};

export const paymentReturn = (idroom: any, idBill: any, value: any) => {
    const url = `/bill/vnpay_return?id=${idroom}&idBill=${idBill}`;
    return axiosClient.post(url, value);
};

export const getQrcodeImg = () => {
    const url = `/dashboard/user`;
    return axiosClient.get(url);
};

