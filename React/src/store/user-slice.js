import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    userUpdated: false,
  },
  reducers: {
    setUserInfo(state, action) {
      state.data = action.payload;
    },
    updateUserInfo(state, action) {
      state.data = action.payload;
      state.userUpdated = true;
    },
    resetUserUpdated(state) {
      state.userUpdated = false;
    }


  },
});

export default userSlice.reducer;

export const { setUserInfo } = userSlice.actions;
