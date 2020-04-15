import { useState } from 'react';

const useVisualMode = (initialMode) => {
  const [ mode, setMode ] = useState(initialMode);
  const [ history, setHistory ] = useState([initialMode])

  const transition = (newMode, replace = false) => {
    setMode(newMode);

    const newHistory = [ ...history ];
    if (replace) {
      newHistory[newHistory.length - 1] = newMode;
    } else {
      newHistory.push(newMode);
    }
    setHistory(newHistory);
  };
  
  const back = () => {
    let newHistory = [ ...history ];
    if (history.length > 1) {
      newHistory = history.slice(0, history.length - 1)
      setHistory( newHistory );
    }

    setMode(newHistory[newHistory.length - 1]);
  };
  
  return { mode, transition, back };
};

export default useVisualMode;