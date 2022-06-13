import { createSlice } from "@reduxjs/toolkit";

export const pageSizeSlice = createSlice({
  name: "pageSize",
  initialState: {
    value: 10
  },
  reducers: {
    modifyPageSize: (state, action) => {
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { modifyPageSize } = pageSizeSlice.actions;

export default pageSizeSlice.reducer;
