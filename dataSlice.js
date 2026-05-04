import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  issues: []
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {

    setUsers: (state, action) => {
      state.users = action.payload;
    },

    setIssues: (state, action) => {
      state.issues = action.payload;
    }

  }
});

export const { setUsers, setIssues } = dataSlice.actions;
export default dataSlice.reducer;