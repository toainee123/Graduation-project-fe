import axiosClient from "./axiosClient";


export const createAsset = async (assets: any) => {
    const url = `/asset`;
    return axiosClient.post(url, assets);
};
export const getListAssets = async (data: any) => {
    const url = `/asset`;
    return axiosClient.get(url, {
        params: data,
    });
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

export const getAssetUser = async () => {
    const url = `/asset/asset-user`;
    return axiosClient.get(url);
};

export const getListAssetsForUser = async () => {
    const url = `/service/service-user`
    return axiosClient.get(url)
}

