import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    memberIdList: [],
}

// List of currently slected members by ID 
const memberIdListSlice = createSlice({
    name: 'memberIds',
    initialState,
    reducers: {
        memberAdd: (state, action) => {
            state.memberIdList.push(action.payload);
        },
        memberRemove: (state, action) =>  {
            let memberId = state.memberIdList.find(id => id === action.payload)
            let loc = state.memberIdList.indexOf(memberId)
            state.memberIdList.splice(loc, 1)
        },
    },
});

export const { memberAdd, memberRemove } = memberIdListSlice.actions;
export default memberIdListSlice.reducer;
