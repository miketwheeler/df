import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import userReducer from '../features/userSlice'
import memberIdListReducer from '../features/memberhallSlices/memberIdListSlice';
import memberCardSelectedReducer from '../features/memberhallSlices/memberCardSelectSlice';

import { devfoyerApi } from '../features/api/devfoyerApi';
import  authReducer  from '../features/auth/authSlice';

// psersist store
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';

// could use sessionStorage storage engine as a persistant solution alternative
// import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'


// const persistConfig = {
//   key: 'root',
//   storage,
//   // or if whole session, might be considered here - 'storageSession',
// }

const reducer = combineReducers({
  // add reducers here
  [devfoyerApi.reducerPath]: devfoyerApi.reducer,
  auth: authReducer,
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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(devfoyerApi.middleware),
  devTools: true, // dont want this active in prod, extra logging for store top level
})

setupListeners(store.dispatch);

// console.log(store.getState())

export default store;

// **
// export const persistor = persistStore(store)