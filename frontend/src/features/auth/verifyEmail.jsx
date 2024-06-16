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

export const verifyEmailAction = createAction("verifyEmail/action");

const verifyEmailSlice = createSlice({
  name: "verifyEmail",
  initialState,
  reducers: {
    verifyEmailPending: (state) => {
      state.loading = true;
      state.error = null;
      state.status = null;
      state.code = null;
      state.message = null;
      state.data = null;
      state.success = false;
    },
    verifyEmailSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      const { status, code, message, data } = action.payload;
      state.success = true;
    },
    verifyEmailError: (state, action) => {
      state.loading = false;
      state.error = true;
      const { status, code, message } = action.payload;
    },
  },
});

export const { verifyEmailError, verifyEmailPending, verifyEmailSuccess } =
  verifyEmailSlice.actions;
export default verifyEmailSlice.reducer;
