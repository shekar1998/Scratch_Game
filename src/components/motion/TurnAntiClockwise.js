import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import UndoIcon from '@material-ui/icons/Undo';
import Paper from '@material-ui/core/Paper';
import { SET_ANGLE } from '../../redux/character/characterSlicer';
import { ADD_OPERATION } from '../../redux/midarea/listSlicer';

const TurnAntiClockWise = ({ comp_id }) => {
  const [angle, setAngle] = useState(0);
  const character = useSelector((rootReducer) => rootReducer?.character);
  const dispatch = useDispatch();

  // handle anti-clockwise rotation
  const handleClick = () => {
    let anti_angle = -1 * angle;
    const el = document.getElementById(character.active);
    const character_angle = character.characters.find((x) => x.id === character.active);
    if (character_angle) {
      el.style.transform = `rotate(${character_angle.angle + anti_angle}deg)`;
      dispatch(SET_ANGLE(character_angle.angle + anti_angle));
    }
  };

  function debounce(value, delay) {
    setAngle(value);
    let timerId;
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      dispatch(
        ADD_OPERATION({
          type: 'TURN_ANTI_CLOCKWISE',
          value: value,
        })
      );
    }, delay);
  }

  return (
    <Paper elevation={3}>
      <div className='text-center rounded bg-blue-500 p-2 my-3'>
        <div className='grid grid-cols-2'>
          <div className='text-white'>Rotate By:</div>
          <input className='mx-2 p-1 py-0 text-center' type='number' value={angle} onChange={(e) => debounce(e.target.value, 2000)} />
        </div>
        <div id={comp_id} className={`flex bg-blue-700 text-white px-2 py-1 mt-3 mb-1 text-sm`}>
          <div className='flex mx-auto'>
            Turn
            <UndoIcon className='mx-2' />
            {angle} degrees
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default TurnAntiClockWise;
