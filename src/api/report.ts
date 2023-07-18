import axiosClient from "./axiosClient";

export const getListReportCustomerRent = async () => {
    const url = `http://localhost:5000/api/roomTenant/renting-room`;
    return axiosClient.get(url)
}

export const getListReportCustomerContractExpired = async () => {
    const url = 'http://localhost:5000/api/contract';
    return axiosClient.get(url)
}