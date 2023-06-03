import { call, put } from 'redux-saga/effects';
import { setUserQuiz } from '../../store/user-slice';




export function* uploadQuizSaga(action){
    try {
        const formData = new FormData();
        formData.append('title', action.payload.title);
        formData.append('description', action.payload.description);
        formData.append('department', action.payload.department);
        formData.append('year', action.payload.year);
        formData.append('course', action.payload.course);
        formData.append('file', action.payload.file);
    
        yield call(fetch, 'https://localhost:7061/api/Quiz/UploadQuiz', {
          method: 'POST',
          headers: {
            Authorization: `bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        });
    
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

export function* GetAllQuizByYearAndDepartment(action){
    try {
        const response = yield call(
        fetch,
        `https://localhost:7061/api/Quiz/GetAllQuizByYearAndDepartment?year=${action.payload.year}&department=${action.payload.department}`,
        {
            method: "GET",
            headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
            },
        }
        );
    
        const data = yield response.json();
    
        yield put(setUserQuiz(data));
     
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
