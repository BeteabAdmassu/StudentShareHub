import { put, call } from "redux-saga/effects";
import {
  loginUser,
  logoutUser,
  REGISTER_SUCCESS,
} from "../../store/auth-slice";

import { setUserInfo } from "../../store/user-slice";
import { useDispatch } from "react-redux";
import { act } from "react-dom/test-utils";

export function* loginSaga(action) {
  //delay for 5 seconds
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const formData = new FormData();
    formData.append("email", action.payload.username);
    formData.append("password", action.payload.password);

    const response = yield call(
      fetch,
      "https://localhost:7061/api/User/Signin",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Login failed. Please try again.");
    }

    const data = yield response.json();
    const token = data.token;

    // Store the token in localStorage
    localStorage.setItem("token", token);

    // Dispatch a success action
    yield put(loginUser(token));

    if (action.callback) {
      action.callback();
    }
  } catch (error) {
    // Invoke the error callback if available
    if (action.errorCallback) {
      action.errorCallback(error);
    }
  }
}

export function* registerSaga(action) {
  //delay for 5 seconds
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const formData = new FormData();
    formData.append("firstName", action.payload.firstname);
    formData.append("lastName", action.payload.lastname);
    formData.append("email", action.payload.email);
    formData.append("password", action.payload.password);

    const response = yield call(
      fetch,
      "https://localhost:7061/api/User/Signup",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Registartion failed. Please try again.");
    }

    yield put(REGISTER_SUCCESS());

    // Dispatch a success action

    if (action.callback) {
      action.callback();
    }
  } catch (error) {
    // Invoke the error callback if available
    if (action.errorCallback) {
      action.errorCallback(error);
    }
  }
}

export function* logoutSaga(action) {
  //delay for 5 seconds
  yield new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const token = localStorage.getItem("token");

    const response = yield call(
      fetch,
      "https://localhost:7061/api/User/Signout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "no-cors": "true",
        },
        body: {},
      }
    );

    if (!response.ok) {
      throw new Error("Login failed. Please try again.");
    }

    //Remove the token from localStorage
    localStorage.removeItem("token");

    yield put(logoutUser());

    if (action.callback) {
      action.callback();
    }
  } catch (error) {
    if (action.errorCallback) {
      action.errorCallback(error);
    }
  }
}

export function* fetchUserData() {
  try {
    const response = yield call(
      fetch,
      "https://localhost:7061/api/User/GetUser",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.ok) {
      const data = yield response.json();
      yield put(setUserInfo(data));
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    console.log(error.message);
  }
}

export function* updateUserData(action) {
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const formData = new FormData();
    formData.append("firstname", action.payload.firstName);
    formData.append("lastname", action.payload.lastName);
    formData.append("department", action.payload.department);
    formData.append("year", action.payload.year);
    formData.append("profilePicture", action.payload.profilePicture);
    

     yield call(
      fetch,
      "https://localhost:7061/api/User/UpdateUser",
      {
        method: "PUT",
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    yield put({ type: "FETCH_USER_DATA" });

    if (action.callback) {
      action.callback();
    }
  } catch (error) {
    if (action.errorCallback) {
      action.errorCallback(error);
    }
  }
}