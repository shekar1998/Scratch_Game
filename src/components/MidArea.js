import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { getComponent } from './getComponents';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { purple } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import { useSnackbar } from 'notistack';
import { ADD_HISTORY, ADD_OPERATION } from '../redux/midarea/listSlicer';
import './MidArea.css';

// Styling for MaterialUI Components
const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: 0,
    },
  })
);

// Customized button for Running Lists
const RunButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    fontSize: '13px',
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

// Mid Area Component
function MidArea() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const area_list = useSelector((rootReducer) => rootReducer?.list);
  const character = useSelector((rootReducer) => rootReducer?.character);
  const events = useSelector((rootReducer) => rootReducer?.event);
  let finalRotateValueClockVise = 0;
  let finalRotateValueAntiClockVise = 0;

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const el = document.getElementById(`0-div`);
    el.style.transition = 'all 1.5s';
    el.style.left = '0px';
    el.style.top = '0px';
    el.style.transform = '0deg';
    console.log("USeEffect",area_list);
  }, [area_list]);

  function dataOperation(data) {
    const el = document.getElementById(`0-div`);
    let character_angle;
    switch (data.type) {
      case 'MOVE':
        var left = el.offsetLeft;
        el.style.position = 'relative';
        el.style.left = left + Number(data.value) + 'px';
        break;
      case 'MOVE_Y':
        var top = el.offsetTop;
        el.style.position = 'relative';
        el.style.top = top + Number(data.value) + 'px';
        break;
      case 'TURN_CLOCKWISE':
        character_angle = character.characters.find((x) => x.id === character.active);
        if (character_angle) {
          finalRotateValueClockVise = finalRotateValueClockVise + Number(data.value);
          el.style.transform = `rotate(${Number(finalRotateValueClockVise)}deg)`;
        }
        break;
      case 'TURN_ANTI_CLOCKWISE':
        let anti_angle = -1 * Number(data.value);
        character_angle = character.characters.find((x) => x.id === character.active);
        if (character_angle) {
          finalRotateValueAntiClockVise = finalRotateValueAntiClockVise + Number(anti_angle);
          el.style.transform = `rotate(${Number(finalRotateValueAntiClockVise)}deg)`;
        }
        break;
      case 'SAY_MESSAGE':
        const el1 = document.getElementById(`0-message-box`);
        const el2 = document.getElementById(`0-message-box1`);

        el1.style.display = 'block';
        el1.style.position = 'relative';

        el2.style.display = 'none';

        window.clearTimeout();
        el1.innerHTML = data.value;
        break;
      case 'THINK':
        const Thinlel1 = document.getElementById(`0-message-box`);
        const Thinkel2 = document.getElementById(`0-message-box1`);

        Thinlel1.style.display = 'block';
        Thinlel1.style.position = 'relative';

        Thinkel2.style.display = 'block';
        Thinkel2.style.position = 'relative';

        window.clearTimeout();
        Thinlel1.innerHTML = data.value;
        break;
      case 'BROADCAST':
        enqueueSnackbar(data.value, { variant: 'info' });
        break;
        let curr = events.wait;
        curr[0] = val;
        dispatch(
          ADD_OPERATION({
            type: 'WAIT',
            value: value,
          })
        );
        break;
    }
  }

  let repeatCount = 0;
  // Handle Running the list
  const handleClick = async (arr, id, renderType) => {
    console.log(arr, id);
    if ( arr.length === 0 ) return;
    if ( renderType !== 'History' )
    {
      dispatch(ADD_HISTORY(area_list?.midAreaLists[0]));
    }
    for (let index = 0; index < arr.length; index++) {
      if (arr[index].type !== 'REPEAT') {
        await new Promise((resolve) => {
          setTimeout(
            () => {
              dataOperation(arr[index]);
              resolve();
            },
            arr[index].type === 'WAIT' ? arr[index].value * 1000 : index === 0 ? 300 : 2000
          );
        });
      } else {
        repeatCount++;
        if (repeatCount < arr[index].value) handleClick(arr, id, "History");
      }
    }
  };
  return (
    <div className='flex-1 h-full overflow-auto p-3'>
      <div className='flex justify-between px-20'>
        <div className='flex justify-between'>
          <div className='font-bold mb-5 text-center border border-2 rounded text-white bg-green-400 p-2 w-auto'>Mid Area</div>
        </div>
        <div className='flex justify-between'>
          <div className='font-bold mb-5 text-center border border-2 rounded text-white bg-green-400 p-2 w-auto'>History</div>
        </div>
      </div>

      <div className='grid grid-flow-col'>
        {area_list?.midAreaLists?.map((l) => {
          return (
            <div className='w-60' key={l.id}>
              <Paper elevation={3} className='p-4'>
                <div className='w-52 border border-2 border-gray-300 p-2'>
                  <Droppable droppableId={l.id} type='COMPONENTS'>
                    {(provided) => {
                      return (
                        <ul className={`${l.id} w-48 h-full`} {...provided.droppableProps} ref={provided.innerRef}>
                          <div className='text-center mx-auto my-2 mb-4'>
                            <RunButton variant='contained' className={classes.button} startIcon={<PlayArrowIcon />} onClick={() => handleClick(l.comps, l.id, '')}>
                              Run{' '}
                            </RunButton>
                          </div>

                          {l.comps &&
                            l.comps.map((x, i) => {
                              let str = `${x.type}`;
                              let component_id = `comp${str}-${l.id}-${i}`;

                              return (
                                <Draggable key={`${str}-${l.id}-${i}`} draggableId={`${str}-${l.id}-${i}`} index={i}>
                                  {(provided) => (
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                      {getComponent(str, component_id)}
                                      {provided.placeholder}
                                    </li>
                                  )}
                                </Draggable>
                              );
                            })}
                          {provided.placeholder}
                        </ul>
                      );
                    }}
                  </Droppable>
                </div>
              </Paper>
            </div>
          );
        } ) }
        {
          area_list?.history?.length > 0 ?
            <div className='flex w-66 ml-20 flex-col items-center h-auto text-center gap-x-1 border border-2 rounded '>
          {area_list?.history?.map((l) => {
            console.log( "Historyzs",area_list?.history );
            return (
              <div className='w-62 border border-2 border-gray-300 rounded p-2 my-3'>
                <RunButton variant='contained' className={classes.button} startIcon={<PlayArrowIcon />} onClick={() => handleClick(l.comps, l.id, 'History')}>
                  Run{' '}
                </RunButton>
                <div className='flex flex-col'>
                  {l.comps &&
                    l.comps.map( ( data, i ) =>
                    {
                       console.log( "l.comps",l.comps );
                      return (
                        <p className='text-sm font-semibold leading-6 text-gray-900'>
                          {data.type} - {data.value}
                        </p>
                      );
                    })}
                </div>
              </div>
            );
          })}
            </div> :
            <p className='text-sm font-semibold text-center leading-6 text-gray-900'>
              No History
            </p>
        }

      </div>
    </div>
  );
}

export default MidArea;
