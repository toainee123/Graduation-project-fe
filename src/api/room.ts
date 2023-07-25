import axiosClient from './axiosClient';
export const createRoom = async (room: any) => {
    const url = `/room`;
    return axiosClient.post(url, room);
};
export const createMembers = async (room: any) => {
    const url = `/room`;
    return axiosClient.post(url, room);
};

export const getAllRoom = async () => {
    const url = `/room/list-room`
    return axiosClient.get(url)
};

export const getRoom = async (id: any, query?: any) => {
    const url = `/room/${id}`;
    return axiosClient.get(url, query);
};

export const getByIdRoom = async (id: any) => {
    const url = `/room/getById/${id}`;
    return axiosClient.get(url);
};

export const getDistrict = async (provincesId: any) => {
    const url = `/province/district/${provincesId}`;
    return axiosClient.get(url);
};

export const getWards = async (districtId: any) => {
    const url = `/province/ward/${districtId}`;
    return axiosClient.get(url);
};

export const addRoomMember = async (member: any) => {
    const url = `/roomTenant/add-member`;
    return axiosClient.post(url, member);
};


export const getRoomMember = async (id: any) => {
    const url = `/roomTenant/${id}`;
    return axiosClient.get(url);
};

export const deleteMember = async (id: any) => {
    const url = `/roomTenant/${id}`;
    return axiosClient.delete(url);
}


export const apiCreateRoomTenant = async (room: any) => {
    const url = `/roomTenant`;
    return axiosClient.post(url, room);
};

export const apiGetRoomTenantDetail = async (id: any) => {
    const url = `/roomTenant/detail-roomTenant/${id}`;
    return axiosClient.get(url);
};
export const apiUpdateRoomTenant = async ({ roomId, payload }: any) => {
    console.log("payload , id", roomId, payload);

    const url = `/roomTenant/${roomId}`;
    return axiosClient.put(url, payload);
};

export const addContract = async (value: any) => {

    const url = `//contract`;
    return axiosClient.post(url, value);
};

