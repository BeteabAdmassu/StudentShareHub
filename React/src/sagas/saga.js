import { takeLatest, put, call } from "redux-saga/effects";
import {
  loginSaga,
  logoutSaga,
  registerSaga,
  fetchUserData,
  updateUserData,
  fetchResourcesSaga,
  deleteUserData
} from "./actions/authActions";

import { uploadBookSaga, fetchBookByEmailSaga,GetAllBookByYearAndDepartment, updateBookSaga, deleteBookSaga, submitBookSaga,getAllBookSaga,downloadBook } from "./actions/bookAction";
import { uploadVideoSaga, GetAllVideoByYearAndDepartment, fetchVideoByEmailSaga, updateVideoSaga,deleteVideoSaga,submitVideoSaga,getAllVideoSaga  } from "./actions/videoAction";
import { GetAllQuizByYearAndDepartment} from "./actions/quizAction";


export default function* authSagaWatcher() {
// User
  yield takeLatest("LOGIN_REQUEST", loginSaga);
  yield takeLatest("LOGOUT_REQUEST", logoutSaga);
  yield takeLatest("REGISTER_REQUEST", registerSaga);
  yield takeLatest("FETCH_USER_DATA", fetchUserData);
  yield takeLatest("UPDATE_USER", updateUserData);
  yield takeLatest("DELETE_USER", deleteUserData);
  

// Book
  yield takeLatest("UPLOAD_BOOK", uploadBookSaga);
  yield takeLatest("FETCH_BOOK_BY_EMAIL", fetchBookByEmailSaga)
  yield takeLatest("GET_ALL_BOOK_BY_YEAR_AND_DEPARTMENT", GetAllBookByYearAndDepartment)
  yield takeLatest("UPDATE_BOOK", updateBookSaga);
  yield takeLatest("DELETE_BOOK", deleteBookSaga);
  yield takeLatest("SUBMIT_BOOK", submitBookSaga);
  yield takeLatest("GET_ALL_BOOk", getAllBookSaga)
  yield takeLatest("DOWNLOAD_BOOK", downloadBook)

  

// Video
  yield takeLatest("UPLOAD_VIDEO", uploadVideoSaga);
  yield takeLatest("GET_ALL_VIDEO_BY_YEAR_AND_DEPARTMENT", GetAllVideoByYearAndDepartment)
  yield takeLatest("FETCH_VIDEO_BY_EMAIL", fetchVideoByEmailSaga)
  yield takeLatest("UPDATE_VIDEO", updateVideoSaga);
  yield takeLatest("DELETE_VIDEO", deleteVideoSaga);
  yield takeLatest("SUBMIT_VIDEO", submitVideoSaga);
  yield takeLatest("GET_ALL_VIDEO", getAllVideoSaga)

// Quiz
  yield takeLatest("GET_ALL_QUIZ_BY_YEAR_AND_DEPARTMENT", GetAllQuizByYearAndDepartment)



}
