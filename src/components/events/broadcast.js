import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { ADD_OPERATION } from '../../redux/midarea/listSlicer';

const BroadcastMessage = ({ comp_id }) => {
  const [state, setState] = useState({
    message: '',
  });

  const dispatch = useDispatch();

  function debounce(value, delay) {
    setState({ ...state, message: value });
    let timerId;
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      dispatch(
        ADD_OPERATION({
          type: 'BROADCAST',
          value: value,
        })
      );
    }, delay);
  }

  return (
    <Paper elevation={3}>
      <div className='rounded text-center bg-yellow-400 p-2 my-3'>
        <div className='grid grid-cols-2 my-2'>
          <div className='text-white'>Message</div>
          <input
            className='mx-2 p-1 py-0 text-center'
            type='text'
            value={state.message}
            onChange={(e) => {
              e.target.value.length > 0 && debounce(e.target.value, 2000);
            }}
          />
        </div>
        <div id={comp_id} className='rounded flex flex-row flex-wrap bg-yellow-600 text-white px-2 py-1 my-2 text-sm cursor-pointer'>
          {`Broadcast ${state.message}`}
        </div>
      </div>
    </Paper>
  );
};

export default BroadcastMessage;
