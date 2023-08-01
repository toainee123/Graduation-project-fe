import axiosClient from "./axiosClient";


export const createAsset = async (assets: any) => {
    const url = `/asset`;
    return axiosClient.post(url, assets);
};
export const getListAssets = async () => {
    const url = `/asset`;
    return axiosClient.get(url);
};

export const getAsset = async (id: any) => {
    const url = `/asset/${id}`;
    return axiosClient.get(url, id);
};

export const updateAsset = async (id: any, data: any) => {
    const url = `/asset/${id}`;
    return axiosClient.put(url, data);
};

export const deleteAsset = async (id: any) => {
    const url = `/asset/${id}`;
    return axiosClient.delete(url, id);
};