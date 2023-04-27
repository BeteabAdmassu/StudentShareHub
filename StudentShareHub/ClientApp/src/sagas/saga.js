import { takeEvery, put} from "redux-saga/effects";

export function* fetchData() {
  const data = yield fetch(
    ""
  ).then((res) => res.json());
  // yield put(dataActions.setData(data));
}

export function* addData(action) {
  const timestamp = new Date().getTime(); // generate a unique timestamp
  const newData = { ...action.payload, timestamp }; // add timestamp to payload
  yield fetch(
    "",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }
  );
}



export function* editData(action) {
  yield fetch(
    ``,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload.update),
    }
  );
}

export function* deleteData(action) {
  yield fetch(
    ``,
    {
      method: "DELETE",
    }
  );
}

export default function* fetchSaga() {
  yield takeEvery("FETCH_DATA", fetchData);
  yield takeEvery("ADD_DATA", addData);
  yield takeEvery("EDIT_DATA", editData);
  yield takeEvery("DELETE_DATA", deleteData);
}