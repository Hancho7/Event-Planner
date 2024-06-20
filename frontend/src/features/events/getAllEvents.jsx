import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  status: null,
  code: null,
  message: null,
  data: [],
  success: false,
};

export const getAllEventsAction = createAction("getAllEvents/action");

const getAllEventsSlice = createSlice({
  name: "getAllEvents",
  initialState,
  reducers: {
    getAllEventsPending: (state) => {
      state.loading = true;
      state.error = null;
      state.status = null;
      state.code = null;
      state.message = null;
      state.data = null;
      state.success = false;
    },
    getAllEventsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.code = action.payload.code;
      state.status = action.payload.status;
      state.data = action.payload.data;
      state.message = action.payload.message;
      state.success = true;
    },
    getAllEventsError: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
      state.code = action.payload.code;
      state.status = action.payload.status;
    },
  },
});

export const { getAllEventsError, getAllEventsPending, getAllEventsSuccess } =
  getAllEventsSlice.actions;
export default getAllEventsSlice.reducer;
