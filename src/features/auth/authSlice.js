import { async } from "@firebase/util"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import auth from "../../firebase/firebase.config"

const initialState = {
   user : {email: "", role: ""},
    isLoading: true,
    isError: false,
    error: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers : {
        logOut : (state) => {
            state.user.email = ""
        },
        setUser : (state, action) => {
            state.user.email = action.payload
        },
        toggleLoading : (state) => {
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createUser.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = ""
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.user.email = action.payload
        })
        .addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user.email = "";
            state.isError = true;
            state.error = action.error.message
        })
        .addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = ""
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user.email = action.payload;
            state.isError = false;
            state.error = ""
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user.email = "";
            state.isError = true;
            state.error = action.error.message
        })
        .addCase(googleSign.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = ""
        })
        .addCase(googleSign.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.user.email = action.payload
        })
        .addCase(googleSign.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })
        .addCase(getUser.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = ""
        })
        .addCase(getUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            if(payload.status){
                state.user = payload.data
            }
            else{
                state.user.email = payload
            }
            
        })
        .addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })
    }
})

export const createUser = createAsyncThunk("auth/createUser", async({email, password}) => {
    const data = await createUserWithEmailAndPassword(auth, email, password)
    return data;
})

export const getUser = createAsyncThunk("auth/getUser", async(email) => {
    const res = await fetch(`${process.env.REACT_APP_DEV_URL}/user/${email}`)
    const data = await res.json()
    if(data.status){
        return data
    }
    return email
})

export const loginUser = createAsyncThunk("auth/loginUser", async({email, password}) => {
    const data = await signInWithEmailAndPassword(auth, email, password)
    return data;
})


export const googleSign = createAsyncThunk("auth/googleSign", async() => {
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, provider)
    return data
})

export const {logOut, setUser, toggleLoading} = authSlice.actions;

export default authSlice.reducer