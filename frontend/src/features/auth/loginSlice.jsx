import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  status: null,
  code: null,
  message: null,
  data: null,
  success: false,
};

export const loginAction = createAction("login/action");

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.loading = true;
      state.error = null;
      state.status = null;
      state.code = null;
      state.message = null;
      state.data = null;
      state.success = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.code = action.payload.code;
      state.status = action.payload.status;
      state.data = action.payload.data;
      state.message = action.payload.message;
      state.success = true;
    },
    loginError: (state, action) => {
      state.loading = false;
      state.error = true;
      state.code = action.payload.code;
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    logOut: (state) => {
      state.loading = false;
      state.error = false;
      state.status = null;
      state.code = null;
      state.message = null;
      state.data = null;
      state.success = false;
    },
  },
});

export const { loginError, loginPending, loginSuccess, logOut } = loginSlice.actions;
export default loginSlice.reducer;
