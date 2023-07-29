import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"
import authSlice from "../features/auth/authSlice"

export const store = configureStore({
    [apiSlice.reducerPath] : apiSlice.reducer,
    reducer : {
        auth: authSlice
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})