import axiosClient from "./axiosClient"

const authApi = {
    login(params: any) {
        const url = `auth/login`
        return axiosClient.post(url, params)
    },
    register(params: any) {
        const url = `auth/register`
        return axiosClient.post(url, params)
    },
    forgetpassw(params: any) {
        const url = `/auth/forgot-password`
        return axiosClient.post(url, params)
    },
    creatpassword(code: any, params: any) {
        const url = `/auth/create-new-password?code=${code}`
        return axiosClient.post(url, params)
    },
    changepassword(datachange: any) {
        const url = `/auth/change-password`
        return axiosClient.post(url, datachange)
    }
}

export default authApi