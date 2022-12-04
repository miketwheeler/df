
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { data, token } = action.payload;
            state.user = data.user;
            state.token = token;
        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
        }
    },
});


export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.user;
export const selectCurrentToken = (state) => state.token;