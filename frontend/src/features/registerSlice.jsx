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

export const registerAction = createAction("register/action");

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerPending: (state) => {
      state.loading = true;
      state.error = null;
      state.status = null;
      state.code = null;
      state.message = null;
      state.data = null;
      state.success = false;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      const { status, code, message, data } = action.payload;
      state.success = true;
    },
    registerError: (state, action) => {
      state.loading = false;
      state.error = true;
      const { status, code, message } = action.payload;
    },
  },
});

export const { registerError, registerPending, registerSuccess } =
  registerSlice.actions;
export default registerSlice.reducer;
