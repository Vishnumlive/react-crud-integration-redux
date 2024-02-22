// import { configureStore } from "@reduxjs/toolkit";
// import { customerReducer } from "./customerSlice";

// export  const store = configureStore({
//     reducer: {
//         counter: customerReducer,
//     },
// })


import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './customerSlice';

export const store = configureStore({
  reducer: {
    customer: customerReducer
  }
});

// export default store;