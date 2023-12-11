import React, { useState, useRef, useEffect } from 'react';
import PlaygroundComponent from './PlaygroundComponent';
import Highlighter from './Highlighter';
import { getUniqueSelectorFromEvent, registerServiceWorker } from '../utils';

const Selector = () => {
  const [isSelectionActive, setIsSelectionActive] = useState(false);
  const highlightRef = useRef(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    }
  }, []);

  const handleHighlight = e => {
    highlightRef.current.updateSizeFromElement(e.target);
  };

  const handleSelection = e => {
    setIsSelectionActive(false);
    document.removeEventListener('mouseover', handleHighlight);
    document.removeEventListener('click', handleSelection);

    const fullSelector = getUniqueSelectorFromEvent(e);
    // Sending a message to the Service Worker
    navigator.serviceWorker.controller.postMessage({ selector: fullSelector });
  };

  const initSelect = e => {
    if (isSelectionActive) {
      return;
    }

    e.stopPropagation();
    setIsSelectionActive(true);
    document.addEventListener('mouseover', handleHighlight);
    document.addEventListener('click', handleSelection);
  };

  return (
    <>
      <button onClick={initSelect}>Select</button>
      <PlaygroundComponent />
      <Highlighter ref={highlightRef} isActive={isSelectionActive} />
    </>
  );
};

export default Selector;
