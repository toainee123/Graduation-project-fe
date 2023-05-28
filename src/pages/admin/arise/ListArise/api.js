import axios from "axios";
import { baseApiArise } from "./constant";


export const postApiArise = (url, data, CancelToken) =>
    new Promise((resolve, reject) =>
        baseApiArise
            .post(url, data, { CancelToken })
            .then(res => resolve(res))
            .catch(err => reject(err)),
    );
export const getApiArise = (url, CancelToken) =>
    new Promise((resolve, reject) =>
        baseApiArise
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