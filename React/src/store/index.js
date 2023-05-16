import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import fetchSaga from "../sagas/saga";
import bookSlice from './book-slice'
import videoSlice from './video-slice'
import quizzSlice from './quizz-slice'
import authSlice from './auth-slice'


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { auth: authSlice , books: bookSlice, videos: videoSlice, quizz: quizzSlice },
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(fetchSaga);

export default store;
