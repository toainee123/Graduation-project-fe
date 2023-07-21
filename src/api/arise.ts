import axiosClient from "./axiosClient";

export const getWards = async (districtId: any) => {
    const url = `/province/ward/${districtId}`;
    return axiosClient.get(url);
};