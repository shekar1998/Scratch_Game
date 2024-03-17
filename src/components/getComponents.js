import React from 'react';
import Move from './motion/Move';
import TurnAntiClockwise from './motion/TurnAntiClockwise';
import TurnClockwise from './motion/TurnClockwise';
import GotoXY from './motion/Goto';
import SayMessage from './looks/SayMessage';
import MoveY from './motion/MoveY';
import Think from './looks/Think';
import BroadcastMessage from './events/broadcast';
import Wait from './control/Wait';
import RepeatAll from './control/RepeatAll';

// fetch components based on different keys
export const getComponent = (key, id) => {
  switch (key) {
    case 'MOVE_Y':
      return <MoveY comp_id={id} />;
    case 'MOVE':
      return <Move comp_id={id} />;

    case 'TURN_CLOCKWISE':
      return <TurnClockwise comp_id={id} />;

    case 'TURN_ANTI_CLOCKWISE':
      return <TurnAntiClockwise comp_id={id} />;

    case 'GOTO_XY':
      return <GotoXY comp_id={id} />;

    case 'SAY_MESSAGE':
      return <SayMessage comp_id={id} />;

    case 'THINK':
      return <Think comp_id={id} />;

    case 'BROADCAST':
      return <BroadcastMessage comp_id={id} />;

    case 'WAIT':
      return <Wait comp_id={id} />;

    case 'REPEAT':
      return <RepeatAll comp_id={id} />;

    default:
      return React.null;
  }
};
