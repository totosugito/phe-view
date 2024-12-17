import { createSlice } from "@reduxjs/toolkit";

const SLICE_KEY = "sidebar"
export function getData() {
  return (JSON.parse(localStorage.getItem(SLICE_KEY)));
}

export function setData(data) {
  localStorage.setItem(SLICE_KEY, JSON.stringify(data));
}

const data = getData();
const initialState = data ? {openSideMenu: data.openSideMenu, screenSize: data.screenSize, theme: data.theme} : {
  openSideMenu: false,
  screenSize: undefined,
  theme: "light",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setOpenSideMenu: (state, action) => {
      state.openSideMenu = action.payload;
      setData(state);
    },
    setScreenSize: (state, action) => {
      state.screenSize = action.payload;
      setData(state);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      setData(state);
    },
  }
});

export const { setOpenSideMenu, setScreenSize, setTheme } = sidebarSlice.actions;

export default sidebarSlice.reducer;



