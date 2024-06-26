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

export const plannerRequestAction = createAction("plannerRequest/action");

const plannerRequestSlice = createSlice({
  name: "plannerRequest",
  initialState,
  reducers: {
    plannerRequestPending: (state) => {
      state.loading = true;
      state.error = null;
      state.status = null;
      state.code = null;
      state.message = null;
      state.data = null;
      state.success = false;
    },
    plannerRequestSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.code = action.payload.code;
      state.status = action.payload.status;
      state.data = action.payload.data;
      state.message = action.payload.message;
      state.success = true;
    },
    plannerRequestError: (state, action) => {
      state.loading = false;
      state.error = true;
      state.code = action.payload.code;
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
});

export const {
  plannerRequestError,
  plannerRequestPending,
  plannerRequestSuccess,
} = plannerRequestSlice.actions;
export default plannerRequestSlice.reducer;
