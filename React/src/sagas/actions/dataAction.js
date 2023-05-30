import { call, put } from "redux-saga/effects";



export function* uploadBookSaga(action) {

    //delay for 5 seconds
    yield new Promise((resolve) => setTimeout(resolve, 2000));
    try {
        const formData = new FormData();
        formData.append("title", action.payload.title);
        formData.append("description", action.payload.description);
        formData.append("department", action.payload.department);
        formData.append("year", action.payload.year);
        formData.append("course", action.payload.course);
        formData.append("file", action.payload.file);
       
    
        const response = yield call(
        fetch,
        "https://localhost:7061/api/Books/UploadBook",
        {
            method: "POST",
            body: formData,
        }
        );
    
        if (!response.ok) {
        throw new Error("Upload failed. Please try again.");
        }
    
        const data = yield response.json();
        const token = data.token;
    
        // Store the token in localStorage
        localStorage.setItem("token", token);
    
        // Dispatch a success action
       // yield put(uploadBook(token));
    
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
