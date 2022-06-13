import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    value: 0
  },
  reducers: {
    modifyPage: (state, action) => {
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { modifyPage } = pageSlice.actions;

export default pageSlice.reducer;
