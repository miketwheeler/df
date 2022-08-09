import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import user from './slices/userSlice'

const reducer = combineReducers({
  // add reducers here
  user,
})

const store = configureStore({
  reducer,
})

export default store;