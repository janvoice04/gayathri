import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchComplaints = createAsyncThunk(
  "complaints/fetch",
  async () => {
    const res = await fetch("http://localhost:3000/getAllIssues");
    return await res.json();
  }
);

const complaintSlice = createSlice({
  name: "complaints",
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComplaints.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default complaintSlice.reducer;