import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { ADD_OPERATION } from '../../redux/midarea/listSlicer';

const RepeatAll = () => {
  const [repeat, setStateRepeat] = useState(0);
  const dispatch = useDispatch();

  function debounce(value, delay) {
    setStateRepeat(value);
    let timerId;
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      dispatch(
        ADD_OPERATION({
          type: 'REPEAT',
          value: value,
        })
      );
    }, delay);
  }

  return (
    // Repeat Component
    <Paper elevation={3}>
      <div className='rounded text-center bg-red-400 p-2 my-3'>
        <div className='grid grid-cols-2 my-2'>
          <div className='text-white'>Repeat</div>
          <input className='mx-2 p-1 py-0 text-center' type='number' value={repeat} onChange={(e) => debounce(e.target.value, 2000)} />
        </div>
        <div id={0} className='text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer'>
          Repeat By {repeat}
        </div>
      </div>
    </Paper>
  );
};

export default RepeatAll;
