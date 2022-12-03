import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


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
        registerUser: (state, action) => {
            state.user = action.payload;
        }
    },
});


const { loginSuccess, logoutSuccess, registerUser } = userSlice.actions;

export default userSlice.reducer;


//////////////////////////////////////////////////////////////////
// Actions
// RTK says to consolidate actions & slice in same file, but can split -> actions are for making reqs to backend

// creates 3 possible lifecycle actions: pending, fulfilled, rejected
export const signup = createAsyncThunk(
    'users/signup', // action type string
    // then the callback fn
    async ({ firstName, lastName, email, password, passwordConfirm }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/JSON'
                },
            };
            // req to backend endpoint
            await axios.post(
                '/api/v1/users/signup',
                { firstName, lastName, email, password, passwordConfirm },
                config
            )
        } catch (e) {
            if(e.response && e.response.data.message) {
                return rejectWithValue(e.response.data.message);
            } else {
                return rejectWithValue(e.message);
            }
        }
    }
)
export const login = ({ username, password, passwordConfirm }) => async (dispatch) => {
    try {
        // const res = await api.post('/api/auth/login/', { username, password })
        dispatch(loginSuccess({username, password, passwordConfirm}));
    } catch (e) {
        return console.error(e.message);
    }
};
export const logout = () => async (dispatch) => {
    try {
        // const res = await api.post('/api/auth/logout/')
        return dispatch(logoutSuccess())
    } catch (e) {
        return console.error(e.message);
    }
};
