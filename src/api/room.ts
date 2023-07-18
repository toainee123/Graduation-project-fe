import axiosClient from './axiosClient';
export const getRoom = async (idHouse: any) => {
    const data = await axiosClient.get(`http://localhost:5000/api/room/${idHouse}`);
    return data
};

export const getDistrict = async (provincesId: any) => {
    const url = `/province/district/${provincesId}`;
    return axiosClient.get(url);
};

export const getWards = async (districtId: any) => {
    const url = `/province/ward/${districtId}`;
    return axiosClient.get(url);
};
