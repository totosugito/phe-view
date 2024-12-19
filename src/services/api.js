const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL

export const AppApi = {
  wellProd2024: {
    wellList: APP_BASE_URL + "/well/list",
    wellOpen: APP_BASE_URL + "/well/open",
    platformList: APP_BASE_URL + "/platform/list",
    platFormOpen: APP_BASE_URL + "/platform/open",
  },
}