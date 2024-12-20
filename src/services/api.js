const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL

const baseWellsProd2024 = "/wells-prod2024"
export const AppApi = {
  wellProd2024: {
    region: {
      list: APP_BASE_URL + baseWellsProd2024 + "/region/list",
      summary: APP_BASE_URL + baseWellsProd2024 + "/region/summary",
      open: APP_BASE_URL + baseWellsProd2024 + "/region/open",
      bestByPlatform: APP_BASE_URL + baseWellsProd2024 + "/region/best-platform",
    },
    platform: {
      list: APP_BASE_URL + baseWellsProd2024 + "/platform/list",
      open: APP_BASE_URL + baseWellsProd2024 + "/platform/open",
      bestByWells: APP_BASE_URL + baseWellsProd2024 + "/platform/best-wells",
    },
    wells: {
      list: APP_BASE_URL + baseWellsProd2024 + "/wells/list",
      open: APP_BASE_URL + baseWellsProd2024 + "/wells/open",
    }
  },
}