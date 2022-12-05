import { devfoyerApi } from "../api/devfoyerApi";

export const signupApiSlice = devfoyerApi.injectEndpoints({
    endpoints: builder => ({
        signupUser: builder.mutation({
            query: (signupBody) => ({
                url: '/users/signup',
                method: 'POST',
                body: signupBody
            })
        })
    })
})

export const { useSignupMutation } = signupApiSlice;