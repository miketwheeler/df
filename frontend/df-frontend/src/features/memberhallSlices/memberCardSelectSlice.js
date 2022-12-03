import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    memberSelected: -1,
}


const memberSelectedSlice = createSlice({
    name: 'memberSelected',
    initialState,
    reducers: {
        memberSelect: (state, action) => {
            state.memberSelected = action.payload;
        },
    }
})

export const { memberSelect } = memberSelectedSlice.actions;
export default memberSelectedSlice.reducer;