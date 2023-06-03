import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import authSagaWatcher from "../sagas/saga";
import bookSlice from "./book-slice";
import videoSlice from "./video-slice";
import quizzSlice from "./quizz-slice";
import authSlice from "./auth-slice";
import userSlice from "./user-slice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    books: bookSlice,
    videos: videoSlice,
    quizz: quizzSlice,
    userDatas: userSlice,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(authSagaWatcher);

export default store;
