import React, { useState, useEffect, useRef } from 'react';

import './CircularProgressBar.css';

type Mode = 'light' | 'dark';

export interface CircularProgressProps {
  size?: number;
  progress: number;
  strokeWidth?: number;
  circleStrokeOne?: string;
  showPercent?: boolean;
  mode?: Mode;
}

const CircularProgressBar = (props: CircularProgressProps) => {
  const [offset, setOffset] = useState(0);
  const circleRef = useRef<SVGCircleElement>(null);
  const [progressText, setProgressText] = useState('');
  const [progressColor, setProgressColor] = useState('');

  const {
    size = 150,
    progress,
    strokeWidth = 15,
    circleStrokeOne = '#d9edfe',
    showPercent = true,
    mode = 'dark',
  } = props;

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setProgressText(progress.toString());
    setOffset(progressOffset);

    /* istanbul ignore else */
    if (circleRef.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      circleRef.current.style =
        'transition: stroke-dashoffset 850ms ease-in-out, stroke 500ms linear';
    }

    /* istanbul ignore else */
    if (progress >= 75) {
      setProgressColor('#47e61c');
    } else if (progress < 25) {
      setProgressColor('#f00e0e');
    } else if (progress < 50) {
      setProgressColor('#f59b33');
    } else if (progress < 75) {
      setProgressColor('#daf542');
    }
  }, [setOffset, progress, circumference, offset]);

  const textStyle = mode === 'light' ? '#fff' : '#000';

  return (
    <div>
      <svg className="circular-progress-bar" width={size} height={size}>
        <circle
          className="circular-progress-bar-bg"
          stroke={circleStrokeOne}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          ref={circleRef}
          className="circulare-progress-bar-circle"
          stroke={progressColor}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
        />
        <text
          x={center}
          y={center}
          className="circular-progress-bar-percentage"
          fill={textStyle}
        >
          {parseInt(progressText.toString() || '30')}
          {showPercent ? '%' : null}
        </text>
      </svg>
    </div>
  );
};

export default CircularProgressBar;
