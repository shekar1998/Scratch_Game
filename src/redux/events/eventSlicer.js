import { createSlice } from '@reduxjs/toolkit';

export const eventSlicer = createSlice({
  name: 'events',
  initialState: {
    repeat: {},
    wait: {},
  },
  reducers: {
    SET_REPEAT(state, action) {
      state.repeat = action.value;
    },
    SET_WAIT(state, action) {
      state.wait = action.value;
    },
  },
});

export const { SET_REPEAT, SET_WAIT } = eventSlicer.actions;
export default eventSlicer.reducer;
