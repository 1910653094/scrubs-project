import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isAuthed: true,
    role: "medical",
  },
  reducers: {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
