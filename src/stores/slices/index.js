import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "./authSlice"
import sidebarSlice from "./sidebarSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  sidebar: sidebarSlice,
})

export default rootReducer
