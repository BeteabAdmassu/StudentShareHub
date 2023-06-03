import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [
    ],
    filters: {
      materialType: "",
      year: "",
      department: "",
    },
  },
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
});

export default bookSlice.reducer;

export const bookActions = bookSlice.actions;
