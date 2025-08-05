// usePomodoro custom hook
import { useState, useRef } from 'react';

export const usePomodoro = () => {
  const [time, setTime] = useState(1500); // 25 min
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  // Add start, pause, reset, and stats logic here
  return { time, isActive };
};
