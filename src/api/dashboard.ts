import axiosClient from "./axiosClient";

export const getDashboard = async () => {
    const url = `http://localhost:5000/api/dashboard`;
    return axiosClient.get(url)
}

export const getListEmail = () => {
    const url = `/dashboard/list-email`
    return axiosClient.get(url)
}

export const sendEmail = (data: any) => {
    const url = `/dashboard/send-email`
    return axiosClient.post(url, data)
}

export const getHistoryEmail = (data: any) => {
    const url = `/dashboard/history-email`
    return axiosClient.get(url, {
        params: data,
    })
}

export const getNotification = () => {
    const url = `dashboard/notification`
    return axiosClient.get(url)
}
export const updateNotification = ({ id, value }: any) => {
    const url = `dashboard/notification/${id}`
    return axiosClient.put(url, value)
}