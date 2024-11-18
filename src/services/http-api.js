
import axios from "axios";
import {SHOW_LOG} from "../constants/config.jsx";

export const httpGet = async (url, config = {}) => {
    if(SHOW_LOG) {
        console.log("GET: ", url)
    }

    try {
        let response = await axios.get(url, config)

        if(SHOW_LOG) {
            console.log("OUT: ", response.data)
        }
        return (response.data);
    } catch (err) {
        const message =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message;
        return ({status: false, msg: message});
    }
}

export const httpPost = async (url, data={}, config={}) => {
    if(SHOW_LOG) {
        console.log("POST: ", url)
    }

    try {
        let response = await axios.post(url, data, config)
        if(SHOW_LOG) {
            console.log("OUT: ", response.data)
        }
        return (response.data);
    } catch (err) {
        const message =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message;
        return ({status: false, msg: message});
    }
}

export const httpPut = async (url, data={}, config={}) => {
    if(SHOW_LOG) {
        console.log("PUT: ", url)
    }

    try {
        let response = await axios.put(url, data, config)
        if(SHOW_LOG) {
            console.log("OUT: ", response.data)
        }
        return (response.data);
    } catch (err) {
        const message =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message;
        return ({status: false, msg: message});
    }
}

export const httpDelete = async (url, config = {}) => {
    if(SHOW_LOG) {
        console.log("DELETE: ", url)
    }

    try {
        let response = await axios.delete(url, config)
        if(SHOW_LOG) {
            console.log("OUT: ", response.data)
        }
        return (response.data);
    } catch (err) {
        const message =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message;
        return ({status: false, msg: message});
    }
}
