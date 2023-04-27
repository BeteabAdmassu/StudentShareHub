import {createSlice} from "@reduxjs/toolkit";

const userVideoSlice = createSlice({
    name: "userVideos",
    initialState: {
        userVideos: []
    },
    reducers: {
        addVideo(state, action) {
            state.userVideos.push(action.payload);
        },
        removeVideo(state, action) {
            state.userVideos = state.userVideos.filter((video) => video.id !== action.payload);
        },
        updateVideo(state, action) {
            const index = state.userVideos.findIndex((video) => video.id === action.payload.id);
            state.userVideos[index] = action.payload;
        }
    }
});

export const userVideoActions = userVideoSlice.actions;

export default userVideoSlice.reducer;