import { MutableRefObject, useEffect, useState } from 'react';
import useEventListener from '../useEventListener';

interface ListOptions {
  container: MutableRefObject<null>;
  wrapper: MutableRefObject<null>;
  itemHeight: number;
}

function useVirtualList<T = unknown>(list: any, options: ListOptions) {
  const { container, wrapper, itemHeight } = options;
  const [visibleList, setVisibleList] = useState([]);

  function getOffset() {
    const scrollTop = (container?.current as unknown as HTMLElement)?.scrollTop;
    return Math.floor(scrollTop / itemHeight);
  }

  function getVisibleCount() {
    const clientHeight = (container?.current as unknown as HTMLElement)
      ?.clientHeight;
    return Math.ceil(clientHeight / itemHeight);
  }

  function calculateRange() {
    const offset = getOffset();
    const offsetDistance = offset * itemHeight;

    (wrapper?.current as unknown as HTMLElement).style.height =
      itemHeight * list.length - offsetDistance + 'px';
    (wrapper?.current as unknown as HTMLElement).style.marginTop =
      offsetDistance + 'px';

    const visibleCount = getVisibleCount();
    const start = Math.max(0, offset);
    console.log('🚀 ~ file: index.tsx:32 ~ calculateRange ~ start:', start);
    const end = Math.min(list.length, visibleCount + offset);
    console.log('🚀 ~ file: index.tsx:34 ~ calculateRange ~ end:', end);
    setVisibleList(list.slice(start, end));
  }

  useEffect(() => {
    calculateRange();
  }, []);

  useEventListener('scroll', calculateRange, { target: container });

  function scrollTo(index: number) {
    const top = index * itemHeight;
    (container?.current as unknown as HTMLElement).scrollTop = top;
    calculateRange();
  }

  return [visibleList, scrollTo] as const;
}

export default useVirtualList;
