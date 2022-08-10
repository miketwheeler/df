import { createSlice } from '@reduxjs/toolkit'


// Slice
const memberToggleSlice = createSlice({
    name: 'userSettings',
    initialState: {
        membersSelected: [],
    },
    reducers: {
        memberAdded: (state, action) => {
            state.push({
                id: action.payload.id,
            });
        },
        memberToggled: (state, action) =>  {
            const member = state.find(member => member.id === action.payload)
            member.completed = !member.completed
        },
    },
});

export const { memberAdded, memberToggled } = memberToggleSlice.actions
export default memberToggleSlice.reducer

// // Actions
// const { loginSuccess, logoutSuccess } = slice.actions
// export const login = ({ username, password }) => async dispatch => {
//     try {
//         // const res = await api.post('/api/auth/login/', { username, password })
//         dispatch(loginSuccess({username}));
//     } catch (e) {
//         return console.error(e.message);
//     }
// }
// export const logout = () => async dispatch => {
//     try {
//         // const res = await api.post('/api/auth/logout/')
//         return dispatch(logoutSuccess())
//     } catch (e) {
//         return console.error(e.message);
//     }
// }