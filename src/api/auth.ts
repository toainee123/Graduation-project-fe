import axiosClient from "./axiosClient"

const authApi = {
    login(params : any) {
        const url = `users/login`
        return axiosClient.post(url, params)
    }
}

export default authApi