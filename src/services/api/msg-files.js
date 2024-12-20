import {apiConnector} from "shared/services/apiConnector.js";
import {AppApi} from "src/services/api.js";
import {toast} from "react-hot-toast";

export const http_msg_list = async () => {
    let result = {}

    try {
        const response = await apiConnector("GET", AppApi.msgFiles.list)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Msg Files List")
        }
        result = response?.data?.data
    } catch (error) {
        toast.error(error.message)
    }
    return result
}