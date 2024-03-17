import { combineReducers } from 'redux';
import characterSlicer from './character/characterSlicer';
import eventSlicer from './events/eventSlicer';
import listSlicer from './midarea/listSlicer';

const rootReducer = combineReducers({
  character: characterSlicer,
  list: listSlicer,
  event: eventSlicer,
});

export default rootReducer;
