import React, {
  forwardRef, useRef, useImperativeHandle, useCallback, useEffect
} from 'react';

const Highlighter = forwardRef(({ isActive }, ref) => {
  const rootRef = useRef(null);

  const updateSize = useCallback(sizes => {
    Object.entries(sizes).forEach(([key, value]) => {
      rootRef.current.style[key] = `${value}px`;
    });
  }, [rootRef]);

  const updateSizeFromElement = useCallback((element, intoView) => {
    if (!element) return;

    if(intoView) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const { offsetHeight, offsetWidth, offsetTop, offsetLeft } = element;
    
    
    updateSize({
      height: offsetHeight,
      width: offsetWidth,
      top: offsetTop,
      left: offsetLeft
    });
  }, [updateSize]);

  const reset = useCallback(() => {
    updateSize({ height: 0, width: 0, top: 0, left: 0 });
  }, [updateSize]);

  useEffect(() => {
    if (!isActive) {
      reset();
    }
  }, [isActive, reset]);

  useImperativeHandle(ref, () => ({
    rootRef,
    updateSize,
    updateSizeFromElement,
    reset
  }), [updateSize, reset, updateSizeFromElement]);

  return <div ref={rootRef} className="highlight" />;
});

export default Highlighter;