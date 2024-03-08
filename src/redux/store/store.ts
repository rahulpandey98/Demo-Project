// import {configureStore} from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
// import rootSaga from './root.saga';
// import {rootReducer} from './root.reducer';
// const sagaMiddleware = createSagaMiddleware();

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }).concat(sagaMiddleware),
// });

// sagaMiddleware.run(rootSaga);

// export default store;

// store.ts
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {combineReducers} from 'redux';
import userReducer from '../slices/user.slice';
import rootSaga from '../store/root.saga';

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here if needed
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
