import {createSlice} from "@reduxjs/toolkit";

const userQuizzSlice = createSlice({
    name: "userQuizzes",
    initialState: {
        userQuizzes: []
    },
    reducers: {
        addQuizz(state, action) {
            state.userQuizzes.push(action.payload);
        },
        removeQuizz(state, action) {
            state.userQuizzes = state.userQuizzes.filter((quizz) => quizz.id !== action.payload);
        },
        updateQuizz(state, action) {
            const index = state.userQuizzes.findIndex((quizz) => quizz.id === action.payload.id);
            state.userQuizzes[index] = action.payload;
        }
    }
});

export const userQuizzActions = userQuizzSlice.actions;

export default userQuizzSlice.reducer;