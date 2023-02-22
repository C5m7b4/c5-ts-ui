import React from 'react';

import Tooltip from './Tooltip';

import { TooltipPosition, TooltipTheme } from './Tooltip';

export interface TooltipDemoProps {
  position: TooltipPosition;
  message: string;
  theme: TooltipTheme;
  style?: React.CSSProperties;
  messageStyle?: React.CSSProperties;
}

const TooltipDemo = (props: TooltipDemoProps) => {
  return (
    <div>
      <Tooltip
        position={props.position}
        message={props.message}
        style={{ marginTop: '20px' }}
        theme={props.theme}
        messageStyle={props.messageStyle}
      >
        <button>{props.message}</button>
      </Tooltip>
    </div>
  );
};

export default TooltipDemo;
