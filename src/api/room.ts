import axiosClient from './axiosClient';


export const getRoom = async (id: any, query?: any) => {
    const url = `/room/${id}`;
    return axiosClient.get(url, query);
};

export const getDistrict = async (provincesId: any) => {
    const url = `/province/district/${provincesId}`;
    return axiosClient.get(url);
};

export const getWards = async (districtId: any) => {
    const url = `/province/ward/${districtId}`;
    return axiosClient.get(url);
};
