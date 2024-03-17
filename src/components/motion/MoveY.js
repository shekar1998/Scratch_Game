import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { ADD_OPERATION } from '../../redux/midarea/listSlicer';

// Move Component for Sidebar
const MoveY = ({ comp_id }) => {
  const [steps, setSteps] = useState(0);
  const dispatch = useDispatch();

  function debounce(value, delay) {
    setSteps(value);
    let timerId;
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      dispatch(
        ADD_OPERATION({
          type: 'MOVE_Y',
          value: value,
        })
      );
    }, delay);
  }

  return (
    <Paper elevation={3}>
      <div id={comp_id} className={`text-center rounded bg-blue-700 text-white p-2 my-2 text-sm cursor-pointer mx-auto`}>
        Move Y <input type='number' className='text-black text-center w-16 mx-2' value={steps} onChange={(e) => debounce(e.target.value, 2000)} /> steps
      </div>
    </Paper>
  );
};

export default MoveY;
