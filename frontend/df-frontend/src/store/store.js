import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import user from '../slices/userSlice'
import memberIdListReducer from '../slices/memberhallSlices/memberIdListSlice';
import memberCardSelectedReducer from '../slices/memberhallSlices/memberCardSelectSlice';

const reducer = combineReducers({
  // add reducers here
  // user,
  memberIdListReducer,
  memberCardSelectedReducer,
})

const store = configureStore({
  reducer,
})

export default store;