import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
  registerSuccess: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;

      if (localStorage.getItem("token") !== null) {
        state.isAuthenticated = true;
      }
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },

    REGISTER_SUCCESS: (state) => {
      state.registerSuccess = true;
    },
  },
});

export const { loginUser, logoutUser, REGISTER_SUCCESS } = authSlice.actions;

export default authSlice.reducer;
