import React, { useState } from 'react';
import CatSprite from './CatSprite';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button: {
      margin: 0,
    },
  })
);

export default function PreviewArea({ character, add_character, set_active }) {
  const classes = useStyles();
  const [active, setActive] = useState(character?.active);
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  let elmnt = null;

  function dragMouseDown(e, id) {
    elmnt = document.getElementById(id);

    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:

    elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
    elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  // handle changing active character
  const handleChange = (e) => {
    setActive(e.target.value);
    set_active(e.target.value);
  };

  return (
    <div className='w-full flex-none h-full overflow-y-auto p-3' id='preview_area'>
      <div className='flex justify-between mb-10'>
        <div className='font-bold mb-5 text-center border border-2 rounded text-white bg-green-400 p-2 w-auto'>Preview Area</div>
      </div>
      <div className='flex justify-around h-full'>
        <div id={`0`} key={`0`} className={`absolute`} onMouseDown={(e) => dragMouseDown(e, `0`)}>
          <div id={`0-div`} className='character'>
            <div className='hidden border-2 p-2 ml-3 mb-2 w-auto whitespace-nowrap' id={`0-message-box`}></div>
            <div className='hidden rounded-full border-2 w-1 left-1 h-1 ml-1 mb-2 whitespace-nowrap' id={'0-message-box1'}></div>
            <CatSprite charac_id={`0`} />
          </div>
        </div>
      </div>
    </div>
  );
}
