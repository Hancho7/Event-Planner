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
      const { status, code, message, data } = action.payload;
      state.success = true;
    },
    loginError: (state, action) => {
      state.loading = false;
      state.error = true;
      const { status, code, message } = action.payload;
    },
  },
});

export const { loginError, loginPending, loginSuccess } = loginSlice.actions;
export default loginSlice.reducer;
