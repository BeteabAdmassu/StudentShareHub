import { takeLatest, put, call } from "redux-saga/effects";
import {
  loginSaga,
  logoutSaga,
  registerSaga,
  fetchUserData,
  updateUserData,
} from "./actions/authActions";
import { uploadBookSaga} from "./actions/dataAction";

export default function* authSagaWatcher() {

  // User
  yield takeLatest("LOGIN_REQUEST", loginSaga);
  yield takeLatest("LOGOUT_REQUEST", logoutSaga);
  yield takeLatest("REGISTER_REQUEST", registerSaga);
  yield takeLatest("FETCH_USER_DATA", fetchUserData);
  yield takeLatest("UPDATE_USER", updateUserData);


  //Book
  yield takeLatest("UPLOAD_BOOK", uploadBookSaga);

}
