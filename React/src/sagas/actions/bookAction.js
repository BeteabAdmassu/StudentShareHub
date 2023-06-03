import { call, put } from "redux-saga/effects";
import { setUserBooks } from "../../store/user-slice";
import { useDispatch } from "react-redux";
import { bookActions } from "../../store/book-slice";

export function* uploadBookSaga(action) {
  console.log("upload book saga");
  try {
    const formData = new FormData();
    formData.append("title", action.payload.title);
    formData.append("description", action.payload.description);
    formData.append("department", action.payload.department);
    formData.append("year", action.payload.year);
    formData.append("course", action.payload.course);
    formData.append("file", action.payload.file);

    yield call(fetch, "https://localhost:7061/api/Books/UploadBook", {
      method: "POST",
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    //FETCH_BOOK_BY_EMAIL
    yield put({ type: "FETCH_BOOK_BY_EMAIL" });

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

//fetch by email
export function* fetchBookByEmailSaga(action) {
  console.log("fetch book by email saga");
  try {
    const response = yield call(
      fetch,
      `https://localhost:7061/api/Books/GetBookByEmail`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = yield response.json();

    yield put(setUserBooks(data));

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

export function* GetAllBookByYearAndDepartment(action) {
  console.log("get all book by year and department");
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const response = yield call(
      fetch,
      `https://localhost:7061/api/Books/GetBook?department=${action.payload.department}&year=${action.payload.year}`,
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
      yield put(bookActions.setBooks(data));
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    console.log(error.message);
  }
}

export function* updateBookSaga(action) {
  console.log("update book saga");
  yield new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const formData = new FormData();
    formData.append("id", action.payload.id);
    formData.append("title", action.payload.title);
    formData.append("description", action.payload.description);
    formData.append("department", action.payload.department);
    formData.append("year", action.payload.year);
    formData.append("course", action.payload.course);

    yield call(fetch, `https://localhost:7061/api/Books/UpdateBook`, {
      method: "PUT",
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    //FETCH_BOOK_BY_EMAIL
    yield put({ type: "FETCH_BOOK_BY_EMAIL" });

    
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

export function* deleteBookSaga(action) {
  console.log("delete book saga");
  yield call(
    fetch,
    `https://localhost:7061/api/Books/DeleteBook?id=${action.payload.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    }
  );
}

export function* submitBookSaga(action) {
  console.log(action.payload.id);
  yield call(
    fetch,
    `https://localhost:7061/api/Books/SubmitBook?id=${action.payload.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    }
  );
}

export function* getAllBookSaga() {
  console.log("get all book saga");
  try {
    const response = yield call(
      fetch,
      `https://localhost:7061/api/Books/GetAllBook`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      const data = yield response.json();
      yield put(bookActions.setBooks(data));
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    console.log(error.message);
  }
}
  export function* downloadBook(action)
  {
    console.log("download book saga");
   const response =  yield call(fetch, `https://localhost:7061/api/Books/DownloadBook?url=${action.payload}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    });


     if(response.ok)
     {
      const data = yield response.blob();
      const downloadUrl = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "book.pdf";
      link.click();
     }
      else
      {
        throw new Error("Request failed with status: " + response.status);
      }



  }

