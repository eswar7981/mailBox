import { startTransition } from "react";

const { createSlice } = require("@reduxjs/toolkit");

const initialAuthState = {
  mode: "login",
  token: false,
  email: "",
  emailTo: "",
  logout:false,
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
    removeTokenId(state,action){
      state.action=false;
      localStorage.removeItem("login")
    },
    setUserEmail(state, action) {
      state.email = action.payload;
    },

    setRecievedMails(state, action) {
      state.recievedMails = action.payload;
    },
    setSentMails(state, action) {
      state.sentMails = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
