import axiosClient from "./axiosClient";

export const createService = async (service: any) => {
    const url = `/service`;
    return axiosClient.post(url, service);
};

export const getListService = async () => {
    const url = `/service`;
    return axiosClient.get(url);
};

export const getService = async (id: number) => {
    const url = `/service/${id}`;
    return axiosClient.get(url);
};

export const updateService = async (id: number, service: any) => {
    const url = `/service/${id}`
    return axiosClient.put(url, service)
}

export const deleteService = async (id: number) => {
    const url = `/service/${id}`
    return axiosClient.delete(url)
}