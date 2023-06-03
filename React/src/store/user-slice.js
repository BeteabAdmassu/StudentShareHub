import { createSlice } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";
import { useDispatch } from "react-redux";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    tempData: {
      department: "",
      year: "",
    },
    books: [],
    videos: [],
    quizz: [],
  },
  reducers: {
    setUserInfo(state, action) {
      state.data = action.payload;
    },
    setUserBooks(state, action) {
      state.books = action.payload;
    },
    setUserVideos(state, action) {
      state.videos = action.payload;
    },
    setUserQuiz(state, action) {
      state.quizz = action.payload;
    },
    setSubmitted(state, action) {
      if (action.payload.material === "Book") {
        const book = state.books.find((book) => book.id === action.payload.id);
        if (book) {
          book.submitted = !book.submitted;
        }
      } else if (action.payload.material === "Video") {
        const video = state.videos.find(
          (video) => video.id === action.payload.id
        );
        if (video) {
          video.submitted = !video.submitted;
        }
      }
    },
     setDeleted(state, action) {
      
       if(action.payload.material === "Book"){
         state.books = state.books.filter((book) => book.id !== action.payload.id);
        }else if(action.payload.material === "Video"){
          state.videos = state.videos.filter((video) => video.id !== action.payload.id);
        }
    },
    setTempData(state, action) {
      state.tempData.department = action.payload.department;
      state.tempData.year = action.payload.year;
    }

  },
});

export const {
  setUserInfo,
  setUserBooks,
  setUserVideos,
  setUserQuiz,
  setSubmitted,
  setDeleted,
  setTempData
} = userSlice.actions;

export default userSlice.reducer;
