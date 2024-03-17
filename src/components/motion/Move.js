import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { ADD_OPERATION } from '../../redux/midarea/listSlicer';

// Move Component for Sidebar
const Move = ({ comp_id }) => {
  const [steps, setSteps] = useState(0);
  const character = useSelector((rootReducer) => rootReducer?.character);
  const dispatch = useDispatch();

  // Function used for moiving Sprint
  const handleClick = (text) => {
    const el = document.getElementById(`0-div`);
    setSteps(text);
    var left = el.offsetLeft;
    el.style.position = 'relative';
    el.style.left = left + Number(text) + 'px';
  };

  function debounce(value, delay) {
    setSteps(value);
    let timerId;
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      dispatch(
        ADD_OPERATION({
          type: 'MOVE',
          value: value,
        })
      );
    }, delay);
  }

  return (
    <Paper elevation={3}>
      <div id={comp_id} className={`text-center rounded bg-blue-700 text-white p-2 my-2 text-sm cursor-pointer mx-auto`}>
        Move X <input type='number' className='text-black text-center w-16 mx-2' value={steps} onChange={(e) => debounce(e.target.value, 2000)} /> steps
      </div>
    </Paper>
  );
};

export default Move;
