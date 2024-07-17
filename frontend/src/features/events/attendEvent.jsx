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

export const attendEventAction = createAction("attendEvent/action");

const attendEventSlice = createSlice({
  name: "attendEvent",
  initialState,
  reducers: {
    attendEventPending: (state) => {
      state.loading = true;
      state.error = null;
      state.status = null;
      state.code = null;
      state.message = null;
      state.data = null;
      state.success = false;
    },
    attendEventSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.code = action.payload.code;
      state.status = action.payload.status;
      state.data = action.payload.data;
      state.message = action.payload.message;
      state.success = true;
    },
    attendEventError: (state, action) => {
      state.loading = false;
      state.error = true;
      state.code = action.payload.code;
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    resetAttendance:(state)=>{
      state.loading = false;
      state.error = false;
      state.status = null;
      state.code = null;
      state.message = null;
      state.data = null;
      state.success = false;

    }
  },
});

export const { attendEventError, attendEventPending, attendEventSuccess, resetAttendance } =
  attendEventSlice.actions;
export default attendEventSlice.reducer;
