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

export const updatePasswordAction = createAction("updatePassword/action");

const updatePasswordSlice = createSlice({
  name: "updatePassword",
  initialState,
  reducers: {
    updatePasswordPending: (state) => {
      state.loading = true;
      state.error = null;
      state.status = null;
      state.code = null;
      state.message = null;
      state.data = null;
      state.success = false;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.code = action.payload.code;
      state.status = action.payload.status;
      state.data = action.payload.data;
      state.message = action.payload.message;
      state.success = true;
    },
    updatePasswordError: (state, action) => {
      state.loading = false;
      state.error = true;
      state.code = action.payload.code;
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
});

export const { updatePasswordError, updatePasswordPending, updatePasswordSuccess } = updatePasswordSlice.actions;
export default updatePasswordSlice.reducer;
