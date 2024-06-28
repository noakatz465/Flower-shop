import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  initialState: { flowerType: '' },
  name: 'search',
  reducers: {
    search: (state, action) => {
      state.flowerType = action.payload;
    },
    clearSearch: (state) => {
      state.flowerType = '';
    }
  }
});

export const { search, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
