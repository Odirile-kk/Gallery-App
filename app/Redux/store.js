import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './imagesSlice';
import locationReducer from './locationSlice';

const store = configureStore({
  reducer: {
    images: imagesReducer,
    location: locationReducer,
  },
});

export default store;
