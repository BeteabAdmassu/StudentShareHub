import { takeLatest, put, call } from "redux-saga/effects";
import {
  loginSaga,
  logoutSaga,
  registerSaga,
  fetchUserData,
  updateUserData,
} from "./actions/authActions";

export default function* authSagaWatcher() {
  yield takeLatest("LOGIN_REQUEST", loginSaga);
  yield takeLatest("LOGOUT_REQUEST", logoutSaga);
  yield takeLatest("REGISTER_REQUEST", registerSaga);
  yield takeLatest("FETCH_USER_DATA", fetchUserData);
  yield takeLatest("UPDATE_USER", updateUserData);
}
