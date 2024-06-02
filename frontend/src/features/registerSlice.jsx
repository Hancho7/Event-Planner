
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  showPassword: false,
  errors: {
    passwordMatch: "",
  },
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    toggleShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
    setError: (state, action) => {
      state.errors[action.payload.field] = action.payload.error;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPasswordMatchError: (state, action) => {
      state.errors.passwordMatch = action.payload;
    },
  },
});

export const { setField, toggleShowPassword, setError } = registerSlice.actions;
export default registerSlice.reducer;
