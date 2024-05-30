import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;

// Async Thunk Action Creator for Login
export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    // Simulate async login process
    const response = await fakeLogin(userData); // Implement your actual login logic here
    if (response.success) {
      dispatch(loginSuccess(response.user));
    } else {
      dispatch(loginFailure(response.error));
    }
  } catch (error) {
    dispatch(loginFailure("An error occurred while logging in."));
  }
};

// Example of a fake login function (replace with your actual login logic)
const fakeLogin = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (userData.username === "demo" && userData.password === "password") {
        resolve({ success: true, user: { username: "demo" } });
      } else {
        resolve({ success: false, error: "Invalid username or password" });
      }
    }, 1000); // Simulate a delay for the login process
  });
};
