import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { ADD_OPERATION } from '../../redux/midarea/listSlicer';

const Wait = ({ events, comp_id, set_wait }) => {
  const [wait, setStateWait] = useState(0);
  const dispatch = useDispatch();

  function debounce(value, delay) {
    setStateWait(value);
    let timerId;
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      dispatch(
        ADD_OPERATION({
          type: 'WAIT',
          value: value,
        })
      );
    }, delay);
  }

  return (
    // Wait Component
    <Paper elevation={3}>
      <div className=' text-center rounded bg-red-400 p-2 my-3'>
        <div className='grid grid-cols-2 my-2'>
          <div className='text-white'>Wait</div>
          <input className='mx-2 p-1 py-0 text-center' type='number' value={wait} onChange={(e) => debounce(e.target.value, 2000)} />
        </div>
        <div id={comp_id} className='text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer'>
          Wait {wait} seconds
        </div>
      </div>
    </Paper>
  );
};

// map state to component
const mapStateToProps = (state) => {
  return {
    events: state.event,
  };
};

// map function to component
const mapDispatchToProps = (dispatch) => {
  return {
    set_wait: (value) => dispatch(setWait(value)),
  };
};

export default Wait;
