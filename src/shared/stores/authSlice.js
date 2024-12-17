import { createSlice } from "@reduxjs/toolkit"

const SLICE_KEY = "auth"
export function getData() {
    return (JSON.parse(localStorage.getItem(SLICE_KEY)));
}

export function setData(data) {
    localStorage.setItem(SLICE_KEY, JSON.stringify(data));
}

const data = getData();
const initialState = data ? {
    loading: false,
    token: data.token,
    user: data.user,
} : {loading: false, token: "", user: null}

const authSlice = createSlice({
    name: SLICE_KEY,
    initialState: initialState,
    reducers: {
        setLoading(state, value) {
            state.loading = value.payload
        },
        setToken(state, value) {
            state.token = value.payload;
            setData(state);
        },
        setUser(state, value) {
            state.user = value.payload;
            setData(state);
        },
        setUserLogin(state, value) {
            state.token = value.payload.token;
            state.user = value.payload.user;
            setData(state);
        },
        setUserLogout(state, value) {
            state.token = "";
            state.user = null;
            setData(state);
        }
    },
})

export const { setLoading, setToken , setUser, setUserLogin, setUserLogout} = authSlice.actions

export default authSlice.reducer
