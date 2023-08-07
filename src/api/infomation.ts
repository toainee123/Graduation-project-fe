import axiosClient from "./axiosClient";

export const getUserInfomation = async () => {
    const url = `http://localhost:5000/api/customer`;
    return axiosClient.get(url)
}