import { createSlice } from "@reduxjs/toolkit";

const quizzSlice = createSlice({
    name: "quizz",
    initialState: {
        quizz: [],
        filters: {
            materialType: "",
            year: "",
            department: "",
        },
    },
    reducers: {
        setQuizz(state, action) {
            state.quizz = action.payload;
        },
        setFilters(state, action) {
            state.filters = action.payload;
        },
    },
});
 
export default quizzSlice.reducer;

export const quizzActions = quizzSlice.actions;