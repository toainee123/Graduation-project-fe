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

export const getServicee = async (id: number) => {
    const url = `/service/get-service/${id}`;
    return axiosClient.get(url);
};

export const createRoomService = async (value: any) => {
    const url = `/service/room-service`;
    return axiosClient.post(url, value);
};

export const updateService = async (roomid: number, service: any) => {

    const url = `/service/room-service/${roomid}`
    console.log(url);
    return axiosClient.put(url, service)
}

export const deleteService = async (id: number) => {
    const url = `/service/${id}`
    return axiosClient.delete(url)
}