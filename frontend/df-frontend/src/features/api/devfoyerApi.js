import { createApi, fetchBaseQuery }  from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../auth/authSlice';

// base query => like axios
// const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://127.0.0.1:3030/api/v1/', //change base url in production (is local instance for now)
//     credentials: 'include', // will send back http cookie with every query
//     prepareHeaders: (headers, { getState }) => {
//         const token = getState().auth.token; // current token stored in state to use every req
//         if(token) {
//             headers.set("authorization", `Bearer ${token}`);
//         }
//         return headers;
//     }
// })

// // this query 'wraps' the baseQuery if token is not fresh does req,res || rejects req || skips to just run baseQuery func
// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions);

//     // 403 he set up as a 'user registered but token not fresh' && 401 for 'not authorized/not exist'
//     if(result?.error.originalStatus === 403) {
//         console.log('sending refresh token');
//         // send refresh token to get new access token
//         const refreshResult = await baseQuery('/refresh', api, extraOptions);
//         console.log(refreshResult);
//         if(refreshResult?.data) {
//             const user = api.getState().auth.user // gets username from cache store vs agian from server
//             // store the new issued token
//             api.dispatch(setCredentials({ ...refreshResult.data, user }));
//             // retry the original query w/ new access token
//             result = await baseQuery(args, api, extraOptions);
//         } else { // if error overall handle gracefully via logout -> likely a 401 *(not authorized)
//             api.dispatch(logOut())
//         }
//     } 
//     // if all goes well
//     return result;
// }

//////////////////////////////////////////////////////////////////////////////////
// the API 
export const devfoyerApi = createApi({
    reducerPath: 'devfoyerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8080/api/v1'}),
    // tagTypes: ["Users"],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => '/users',
        }),
        getUserById: builder.query({
            query: (id) => `/users/:${id}`
        }),
        getMe: builder.query({
            query: () => '/users/me'
        }),

        addNewUser: builder.mutation({
            query: (newUserBody) => ({
                url: '/users',
                method: 'POST',
                body: newUserBody
            })
        }),
        updateUserById: builder.mutation({
            query: (id, updateUserByIdBody) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: updateUserByIdBody
            })
        }),
        updateMe: builder.mutation({
            query: (updateMeBody) => ({
                url: '/users/updateMe',
                method: 'PATCH',
                body: updateMeBody
            })
        }),
        // TRANSFERRED TO IT'S OWN INJECTED ENDPOINT
        // login: builder.mutation({
        //     query: (loginBody) => ({
        //         url: '/users/login',
        //         method: 'POST',
        //         body: loginBody
        //     }),
        // }),
        // signup: builder.mutation({
        //     query: (signupBody) => ({
        //         url: '/users/signup',
        //         method: 'POST',
        //         body: signupBody
        //     }),
        // }),
        deleteUserByIdAdmin: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            })
        }),
        deleteMe: builder.mutation({
            query: () => ({
                url: '/users/deleteMe',
                method: 'DELETE',
            })
        })
        
    })
})

export const { 
    useGetAllUsersQuery, 
    useGetUserByIdQuery,
    useGetMeQuery,
    useAddNewUserMutation,
    useUpdateUserByIdMutation,
    useUpdateMeMutation, 
    // useLoginMutation, 
    // useSignupMutation, 
    useDeleteUserByIdAdminMutation,
    useDeleteMeMutation
} = devfoyerApi;