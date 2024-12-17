import { combineReducers } from "@reduxjs/toolkit"

import {authSlice, sidebarSlice} from "shared/stores"

const rootReducer = combineReducers({
  auth: authSlice,
  sidebar: sidebarSlice,
})

export default rootReducer
