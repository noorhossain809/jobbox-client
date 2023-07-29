import { apiSlice } from "../../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        addJob : builder.mutation({
            query : (data) => ({
                url : '/job',
                method : 'POST',
                body : data
            })
        }),
        // getJob : builder.query({
        //     query : () => ({
        //         url : "/jobs"
        //     })
        // })
        getJobs: builder.query({
            // The URL for the request is '/fakeApi/posts'
            query: () => ({
                url : '/jobs',
            }),
          })
    })
})

export const {useAddJobMutation, useGetJobsQuery } = jobApi