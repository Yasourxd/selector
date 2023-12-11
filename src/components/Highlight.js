import React, { useState, useRef, useEffect } from 'react';
import PlaygroundComponent from './PlaygroundComponent';
import Highlighter from './Highlighter';

const Highlight = () => {
  const [isShowActive, setIsShowActive] = useState(false);
  const [selector, setSelector] = useState(null);
  const highlightRef = useRef(null);

  const handleMessage = event => {
    setSelector(event.data.selector);
  };

  useEffect(() => {
    // Listening for messages from the Service Worker
    navigator.serviceWorker.addEventListener('message', handleMessage);
    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    }
  }, []);

  const showSelected = () => {
    if (isShowActive) {
      setIsShowActive(false);
      return;
    }

    setIsShowActive(true);
    const selectedElement = document.querySelector(selector)
    highlightRef.current.updateSizeFromElement(selectedElement, true);
  };

  return (
    <>
      <button onClick={showSelected}>Show</button>
      <PlaygroundComponent />
      <Highlighter ref={highlightRef} isActive={isShowActive} />
    </>
  );
};

export default Highlight;
