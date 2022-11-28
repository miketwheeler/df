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
//             const user = api.getState().auth.user // gets username from FE form vs sending it back from server
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

export const apiSlice = createApi({
    // baseQuery: baseQueryWithReauth,
    reducerPath: 'v1/api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3030'}),
    endpoints: (builder) => ({
        
        getAllUsers: builder.query({
            query: () => '/users',
        }),
        getUserById: builder.query({
            query: (id) => `/users/:${id}`
        }),
        updateUserById: builder.mutation({
            query: (id, reqBody) => ({
                url: `/users/:${id}`,
                method: 'POST',
                body: reqBody
            }) 
        }),
        login: builder.mutation({
            query: (email, password, reqBody) => ({
                url: '/login',
                method: 'POST',
                body: reqBody
            }),
        }),
        signup: builder.mutation({
            query: (email, password, passowrdConfirm, reqBody) => ({
                url: '/signup',
                method: 'POST',
                body: reqBody
            }),
        }),
        // need to wipe jwt from client state, and invalidate/remove token on the backend
        // logout: builder.mutation({
        //     query: (reqBody) => ({
        //         url: '/signup',
        //         method: 'POST',
        //         body: reqBody
        //     }),
        // }),
    })
})