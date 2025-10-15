import { configureStore } from '@reduxjs/toolkit';

// Minimal store for Phantasma migration (no reducers needed for dummy data)
const dummyReducer = (state = {}) => state;

export default configureStore({
  reducer: {
    dummy: dummyReducer,
  },
});