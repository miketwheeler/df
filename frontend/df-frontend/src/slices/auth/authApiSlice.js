import { devfoyerApi } from "../api/devfoyerApi";

export const authApiSlice = devfoyerApi.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (loginBody) => ({
                url: '/users/login',
                method: 'POST',
                body: loginBody
            })
        }),
        signup: builder.mutation({
            query: (signupBody) => ({
                url: '/users/signup',
                method: 'POST',
                body: signupBody
            })
        })
    })
})

export const { 
    useLoginMutation,
    useSignupMutation
} = authApiSlice;