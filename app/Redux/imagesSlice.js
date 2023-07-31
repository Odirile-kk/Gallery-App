import { createSlice } from '@reduxjs/toolkit';

const imagesSlice = createSlice({
  name: 'images',
  initialState: [],
  reducers: {
    saveImageToGallery: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { saveImageToGallery } = imagesSlice.actions;

export default imagesSlice.reducer;
