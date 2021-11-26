import axios from 'axios'
import { GLOBAL_URL } from './constants'

const httpClient = axios.create({
    baseURL: `${GLOBAL_URL}/`,
});

export function setDefaultHeader(header, value) {
    httpClient.defaults.headers.common[header] = value
}

export async function apiCall(method, url, data, header = {
    'Content-Type': 'application/json'
}) {
    try {
       // console.log('url', url)
        const res = await httpClient({
            method,
            url,
            data,
            headers: header,
            withCredentials: false
        })
     //   console.log('res', res)
        return res
    } catch (error) {
        if (error.response) {
            console.log('Error data : ', error.response.data);
            console.log('Error status : ', error.response.status);
            console.log('Error headers : ', error.response.headers);
        } else if (error.request) {
            console.log('Error request : ', error.request);
        } else {
            console.log('Error message : ', error.message);
        }
        console.log("Error config", error.config);
        // console.log("errorresponse", error.response);
        console.log("Error", error);
        return false
    }
}
