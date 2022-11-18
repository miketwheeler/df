import { createSlice } from '@reduxjs/toolkit'


const initialUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
    loading: false,
    userInfo: {}, // stores the user object
    userToken: null, // stores the jwt
    error: null,
    success: false, // monitors the registration process
}

// Slice
const userSlice = createSlice({
    name: 'user',
    initialState: initialUser !== null ? initialUser : initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logoutSuccess: (state, action) =>  {
            state.user = null;
            localStorage.removeItem('user')
        },
    },
});

export default userSlice.reducer


//////////////////////////////////////////////////////////////////
// Actions
// RTK says to consolidate actions & slice in same file, but can split -> actions are for making reqs to backend
const { loginSuccess, logoutSuccess } = userSlice.actions;
export const login = ({ username, password }) => async dispatch => {
    try {
        // const res = await api.post('/api/auth/login/', { username, password })
        dispatch(loginSuccess({username}));
    } catch (e) {
        return console.error(e.message);
    }
};
export const logout = () => async dispatch => {
    try {
        // const res = await api.post('/api/auth/logout/')
        return dispatch(logoutSuccess())
    } catch (e) {
        return console.error(e.message);
    }
};