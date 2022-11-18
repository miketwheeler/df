import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice'
import memberIdListReducer from '../slices/memberhallSlices/memberIdListSlice';
import memberCardSelectedReducer from '../slices/memberhallSlices/memberCardSelectSlice';

// psersist store
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

// could use sessionStorage storage engine as a persistant solution alternative
// import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'


// const persistConfig = {
//   key: 'root',
//   storage,
//   // or if whole session, might be considered here - 'storageSession',
// }

const reducer = combineReducers({
  // add reducers here
  userReducer,
  memberIdListReducer,
  memberCardSelectedReducer,
})

// Might want to consider 'merging' orders for the initial state and previous - levels to it auto: is 1st order deep

// **
// const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer,
  // **
  // reducer: persistedReducer,

})

export default store;

// **
// export const persistor = persistStore(store)