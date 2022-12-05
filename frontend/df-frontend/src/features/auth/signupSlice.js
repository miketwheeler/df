import { createSlice } from '@reduxjs/toolkit';

const signupSlice = createSlice({
    name: 'signup',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { data, token } = action.payload;
            state.user = data.user;
            state.token = token;
        },
    },
});


export const { setCredentials } = signupSlice.actions;

export default signupSlice.reducer;