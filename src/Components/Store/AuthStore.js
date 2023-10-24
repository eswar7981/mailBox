import { startTransition } from "react";

const { createSlice } = require("@reduxjs/toolkit");

const initialAuthState = {
  mode: "login",
  token: false,
  email: "",
  emailTo: "",
  recievedMails: [],
  sentMails: [],
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    setLogin(state) {
      state.mode = "login";
    },
    setSignUp(state) {
      state.mode = "signUp";
    },
    setTokenId(state, action) {
      state.token = true;
      localStorage.setItem("login", action.payload);
    },
    setUserEmail(state, action) {
      state.email = action.payload;
    },

    setRecievedMails(state, action) {
      state.recievedMails = action.payload;
    },
    setSentMails(state, action) {
      console.log(action.payload);
      state.sentMails = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
