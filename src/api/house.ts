import axiosClient from './axiosClient';
export const create = async (house: any) => {
    const url = `/house`;
    return axiosClient.post(url, house);
};

export const get = async () => {
    const url = `/house`;
    return axiosClient.get(url);
};

export const getById = async (idHouse: any) => {
    const url = `/house/${idHouse}`;
    return axiosClient.get(url);
};

export const update = ({ idHouse, value }: any) => {
    const url = `/house/${idHouse}`
    return axiosClient.put(url, value)
}

export const remove = (id: any) => {
    const url = `/house/${id}`
    return axiosClient.delete(url)
}