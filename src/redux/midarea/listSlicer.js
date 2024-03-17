import { createSlice } from '@reduxjs/toolkit';

export const listSlicer = createSlice({
  name: 'lists',
  initialState: {
    midAreaLists: [
      {
        id: 'midAreaList-0',
        comps: [
          { type: 'MOVE', value: 20 },
          { type: 'MOVE_Y', value: 20 },
          { type: 'TURN_ANTI_CLOCKWISE', value: 20 },
          { type: 'SAY_MESSAGE', value: 'Hello' },
          { type: 'REPEAT', value: 4},
        ],
      },
    ],
    history: [],
  },
  reducers: {
    SET_LIST(state, action) {
      let index = state.midAreaLists.findIndex((x) => x.id === action.id);
      let all_lists = state.midAreaLists;
      let [item] = all_lists.splice(index, 1);
      item.comps = action.list;
      all_lists.splice(index, 0, item);
      state.midAreaLists = all_lists;
    },
    ADD_LIST(state, action) {
      state.midAreaLists = action.payload;
    },
    ADD_OPERATION(state, action) {
      let finalData = state.midAreaLists[0].comps.map((data) => {
        if (data.type === action.payload.type) {
          return {
            type: data.type,
            value: action.payload.value,
          };
        } else {
          return data;
        }
      });
      finalData = [
        {
          id: 'midAreaList-0',
          comps: finalData,
        },
      ];
      state.midAreaLists = finalData;
    },
    ADD_HISTORY(state, action) {
      state.history.push(action.payload);
      state.history = state.history;
    },
  },
});

export const { SET_LIST, ADD_LIST, ADD_OPERATION, ADD_HISTORY } = listSlicer.actions;
export default listSlicer.reducer;
