import {createSlice} from "@reduxjs/toolkit";


const userBookSlice = createSlice({
    name: "userBooks",
    initialState: {
        userBooks: []
    },
    reducers: {
        addBook(state, action) {
            state.userBooks.push(action.payload);
        },
        removeBook(state, action) {
            state.userBooks = state.userBooks.filter((book) => book.id !== action.payload);
        },
        updateBook(state, action) {
            const index = state.userBooks.findIndex((book) => book.id === action.payload.id);
            state.userBooks[index] = action.payload;
        }
    }
});

export const userBookActions = userBookSlice.actions;

export default userBookSlice.reducer;