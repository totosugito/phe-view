import {apiConnector} from "shared/services/apiConnector.js";
import {AppApi} from "src/services/api.js";
import {toast} from "react-hot-toast";

export const http_well_prod2024_region_list = async () => {
  let result = {}

  try {
    const response = await apiConnector("GET", AppApi.wellProd2024.region.list)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Region List")
    }
    result = response?.data?.data
  } catch (error) {
    toast.error(error.message)
  }
  return result
}

export const http_well_prod2024_region_summary = async () => {
  let result = {}

  try {
    const response = await apiConnector("GET", AppApi.wellProd2024.region.summary)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Region Summary")
    }
    result = response?.data?.data
  } catch (error) {
    toast.error(error.message)
  }
  return result
}

export const http_well_prod2024_region_best_by_platform = async () => {
  let result = {}

  try {
    const response = await apiConnector("GET", AppApi.wellProd2024.region.bestByPlatform)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Region Best Platform")
    }
    result = response?.data?.data
  } catch (error) {
    toast.error(error.message)
  }
  return result
}