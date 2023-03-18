import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  filterBy: "all",
};

export const counterSlice = createSlice({
  name: "search&filter",
  initialState,
  reducers: {
    filter: (state, action) => {
      state.filterBy = action.payload;
    },
    search: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { filter, search } = counterSlice.actions;

export default counterSlice.reducer;
