import axiosClient from "./axiosClient"

export const getHouses = async () => {
    const url = `/house`;
    return axiosClient.get(url);
};

export const getRoom = async (id: any) => {
    const url = `/room/${id}?status=true`;
    return axiosClient.get(url);
};


export const getBills = async (date: any) => {
    const url = `/bill?date=${date}`;
    return axiosClient.get(url);
};

export const getBillsHouse = async (value: any) => {
    const house = value.houseId === 'Tất cả' ? '' : value.houseId;
    const url = `/bill?date=${value.date}&houseId=${house}`;
    return axiosClient.get(url);
};

export const getBillNoDate = async () => {
    const url = `/bill`;
    return axiosClient.get(url);
};

export const deleteBill = async (id: string) => {
    const url = `/bill/${id}`;
    return axiosClient.delete(url);
};

export const updatePaid = async (value: any) => {
    const url = `/bill/${value.id}`;
    return axiosClient.put(url, value);
};

export const addBill = async (data: any) => {
    const url = `/bill`;
    return axiosClient.post(url, data);
};

export const getBillID = async (id: any) => {
    const url = `/bill/${id}`;
    return axiosClient.get(url);
};

export const getEstablish = async () => {
    const url = `/establish`;
    return axiosClient.get(url);
};

export const sendMailBill = async (data: any) => {
    const url = `/dashboard/send-many-email`;
    return axiosClient.post(url, data);
};


export const getAllRoomRented = async () => {
    const url = `/room/getRoomRented`;
    return axiosClient.get(url);
}

export const postAllBill = async (data: any) => {
    const url = `/bill/many-bill`;
    return axiosClient.post(url, data);
}

export const getBillUser = async (date: any) => {
    const url = `/bill/bill-user?date=${date}`;
    return axiosClient.get(url);
}

export const getQrcodeUser = async () => {
    const url = `/establish/info-customer`;
    return axiosClient.get(url);
}

