import axiosClient from "./axiosClient";

export const getListUserDashboard = async () => {
    const url = `http://localhost:5000/api/dashboard/user`
    return axiosClient.get(url)
}