import { call, put } from "redux-saga/effects";
import { setUserVideos } from "../../store/user-slice";
import {videoActions} from "../../store/video-slice";


export function* uploadVideoSaga(action) {
  console.log("upload video saga");
  try {
    const formData = new FormData();
    formData.append("Title", action.payload.title);
    formData.append("Description", action.payload.description);
    formData.append("Department", action.payload.department);
    formData.append("year", action.payload.year);
    formData.append("Course", action.payload.course);
    formData.append("VideoUrl", action.payload.video);

    yield call(fetch, "https://localhost:7061/api/Video/UploadVideo", {
      method: "POST",
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    yield put({ type: "FETCH_VIDEO_BY_EMAIL" });
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

export function* GetAllVideoByYearAndDepartment(action) {
  console.log("get all video by year and department");
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const response = yield call(
      fetch,
      `https://localhost:7061/api/Video/GetVideo?department=${action.payload.department}&year=${action.payload.year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      const data = yield response.json();
      yield put(videoActions.setVideos(data));
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
}

export function* fetchVideoByEmailSaga(action) {
  console.log("fetch video by email");
  try {
    const response = yield call(
      fetch,
      `https://localhost:7061/api/Video/GetVideoByEmail`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = yield response.json();
    yield put(setUserVideos(data));

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

export function* updateVideoSaga(action) {
  console.log("update video saga");
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const formData = new FormData();
    formData.append("id", action.payload.id);
    formData.append("title", action.payload.title);
    formData.append("description", action.payload.description);
    formData.append("department", action.payload.department);
    formData.append("year", action.payload.year);
    formData.append("course", action.payload.course);

    yield call(
      fetch,
      `https://localhost:7061/api/Video/UpdateVideo`,
      {
        method: "PUT",
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    yield put({ type: "FETCH_VIDEO_BY_EMAIL" });

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

export function* deleteVideoSaga(action) {
  console.log("delete video saga");
  yield call(
    fetch,
    `https://localhost:7061/api/Video/DeleteVideo?id=${action.payload.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    }
  );
}

export function* submitVideoSaga(action) {
  console.log(action.payload.id);

  yield call(
    fetch,
    `https://localhost:7061/api/Video/SubmitVideo?id=${action.payload.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    }
  );
}

export function* getAllVideoSaga(action) {
  console.log("get all video saga");
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const response = yield call(
      fetch,
      `https://localhost:7061/api/Video/GetAllVideo`,
      {
        method: "GET",
      }
    );

    const data = yield response.json();
    yield put(setUserVideos(data));

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
