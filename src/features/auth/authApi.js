import { apiSlice } from "../../api/apiSlice";
import { getUser } from "./authSlice";


const authApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        register : builder.mutation({
            query : (data) => ({
                method : "POST",
                url : "/user",
                body : data
            }),
            // async onQueryStarted(data, {dispatch, queryFulfilled}){
            //     try{
            //         const res = await queryFulfilled
            //         console.log('16',data.email)
            //         dispatch(getUser(data.email))
            //         console.log('18',data.email)
            //     }
            //     catch(error){
            //         // Huday
            //     }
            // }
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                // `onStart` side-effect
                try {
                  const res = await queryFulfilled
                  // `onSuccess` side-effect
                  dispatch(getUser(data.email))
                } catch (err) {
                  // `onError` side-effect
                }
              },
        }),
    }),
});

export const { useRegisterMutation } = authApi;