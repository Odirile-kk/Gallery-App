// // locationSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const locationSlice = createSlice({
//   name: 'location',
//   initialState: {
//     data: null,
//     errorMsg: null,
//   },
//   reducers: {
//     setLocation: (state, action) => {
//       state.data = action.payload;
//       state.errorMsg = null;
//     },
//     setErrorMsg: (state, action) => {
//       state.errorMsg = action.payload;
//     },
//   },
// });

// export const { setLocation, setErrorMsg } = locationSlice.actions;
// export default locationSlice.reducer;

// store.js

// locationSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: null,
  address: '',
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setLocation, setAddress } = locationSlice.actions;
export default locationSlice.reducer;


