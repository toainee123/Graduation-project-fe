import axios from "axios";
import { baseApiService } from "./constant";


export const postApiService = (url, data, CancelToken) =>
    new Promise((resolve, reject) =>
        baseApiService
            .post(url, data, { CancelToken })
            .then(res => resolve(res))
            .catch(err => reject(err)),
    );
export const getApiService = (url, CancelToken) =>
    new Promise((resolve, reject) =>
        baseApiService
            .get(url, { CancelToken })
            .then(res => resolve(res))
            .catch(err => reject(err)),
    );
export async function getUser() {
    try {
        const response = await axios.get('/user?ID=12345');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}