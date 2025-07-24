import { createSlice } from "@reduxjs/toolkit";

const savedJobsSlice = createSlice({
  name: "savedJobs",
  initialState: [],
  reducers: {
    saveJob: (state, action) => {
      const job = action.payload;
      if (!state.some((j) => j._id === job._id)) {
        state.push(job);
      }
    },
    removeJob: (state, action) => {
      const index = state.findIndex((job) => job._id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { saveJob, removeJob } = savedJobsSlice.actions;
export default savedJobsSlice.reducer;
