import { useRef, useState, useEffect } from 'react';

const VirtualList = ({ items, itemHeight, visibleItems }) => {
  const containerRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(visibleItems - 1);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollOffset = container.scrollTop;
    const newStartIndex = Math.ceil(scrollOffset / itemHeight);
    console.log(
      '🚀 ~ file: test.tsx:14 ~ handleScroll ~ newStartIndex:',
      newStartIndex,
      scrollOffset
    );
    const newEndIndex = Math.min(
      newStartIndex + visibleItems,
      items.length - 1
    );

    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleList = items.slice(startIndex, endIndex + 1);

  return (
    <div
      ref={containerRef}
      style={{ overflowY: 'auto', height: `${visibleItems * itemHeight}px` }}
    >
      <div style={{ height: `${items.length * itemHeight}px` }}>
        {visibleList.map((item, index) => (
          <div key={index} style={{ height: `${itemHeight}px` }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualList;
