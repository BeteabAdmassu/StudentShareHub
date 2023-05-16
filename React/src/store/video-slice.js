import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
    name: "videos",
    initialState: {
        videos: [
            
        ],
        filters: {
            materialType: "",
            year: "",
            department: "",
        },
    },
    reducers: {
        setVideos(state, action) {
            state.videos = action.payload;
        },
        setFilters(state, action) {
            state.filters = action.payload;
        },
    },
});

export default videoSlice.reducer;

export const videoActions = videoSlice.actions;