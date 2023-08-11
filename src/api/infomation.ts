import axiosClient from "./axiosClient";

type UserChangepasswordreq = {
    passwordOld: string,
    password: string,
    password_confirmation: string,
}

export const getUserInfomation = async () => {
    const url = `http://localhost:5000/api/customer`;
    return axiosClient.get(url)
}
export const UserChangepassword = async (req: UserChangepasswordreq) => {
    const url = `http://localhost:5000/api/auth/change-password`;
    return axiosClient.post(url, req)
}