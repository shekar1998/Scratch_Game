import { createSlice } from '@reduxjs/toolkit';

const characterSlicer = createSlice({
  name: 'character',
  initialState: {
    characters: [{ id: 'sprite0', angle: 0 }],
    active: 'sprite0',
  },
  reducers: {
    SET_ACTIVE_CHARACTER(state, action) {
      state.active = action.id;
    },
    ADD_CHARACTER(state, action) {
      let charactersArray = state.characters;
      charactersArray.push({
        id: `sprite${state.characters.length}`,
        angle: 0,
      });
      state.characters = charactersArray;
    },
    SET_ANGLE(state, action) {
      let characters_Array = state.characters;
      let curr_character = characters_Array.find((character) => character.id === state.active);
      const curr_character_index = characters_Array.findIndex((character) => character.id === state.active);
      if (curr_character_index > -1) {
        curr_character.angle = action.angle;
        characters_Array[curr_character_index] = curr_character;
      }
      state.characters = characters_Array;
    },
  },
});

export const { SET_ACTIVE_CHARACTER, ADD_CHARACTER, SET_ANGLE } = characterSlicer.actions;
export default characterSlicer.reducer;
