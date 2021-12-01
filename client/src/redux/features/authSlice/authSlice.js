import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isAuthed: false,
    role: "housekeeper",
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthed = action.payload.auth;
      state.role = action.payload.role;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
