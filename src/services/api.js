export const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL
const API_PATH = APP_BASE_URL + "/api/wells-prod2024"
export const AppApi = {
    wellProd2024: {
        region: {
            list: API_PATH + "/region/list",
            summary: API_PATH + "/region/summary",
            open: API_PATH + "/region/open",
            bestByPlatform: API_PATH + "/region/best-platform",
        },
        platform: {
            list: API_PATH + "/platform/list",
            open: API_PATH + "/platform/open",
            bestByWells: API_PATH + "/platform/best-wells",
        },
        wells: {
            list: API_PATH + "/wells/list",
            open: API_PATH + "/wells/open",
        },
    },
    msgFiles: {
        list: API_PATH + "/msg/list",
    }
}