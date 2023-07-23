import axiosClient from "./axiosClient";

export const getDashboard = async () => {
    const url = `http://localhost:5000/api/dashboard`;
    return axiosClient.get(url)
}

