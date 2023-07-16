import axiosClient from './axiosClient';
export const createRoom = async (room: any) => {
    const url = `/room`;
    return axiosClient.post(url, room);
};

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
