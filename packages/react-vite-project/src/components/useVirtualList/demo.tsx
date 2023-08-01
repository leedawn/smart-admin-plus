import { useRef } from 'react';
import useVirtualList from '.';
import useEventListener from '../useEventListener';

function App() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const originalList = new Array(300)
    .fill(1)
    .map((_, index) => `data-${index}`);

  const [list, scrollTo] = useVirtualList(originalList, {
    container: containerRef,
    wrapper: wrapperRef,
    itemHeight: 32
  });

  useEventListener(
    'keydown',
    (event) => {
      if (event?.keyCode === 13) {
        const index = (event?.target as EventTarget).value;
        scrollTo(index as number);
      }
    },
    { target: inputRef }
  );

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <input ref={inputRef} />
      </div>
      <div
        ref={containerRef}
        id="container"
        style={{
          height: '200px',
          overflowY: 'auto',
          marginTop: '20px',
          width: '50%',
          textAlign: 'center'
        }}
      >
        <div ref={wrapperRef} id="wrapper">
          {list.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  height: '30px',
                  borderTop: '1px solid #eee',
                  borderBottom: '1px solid #eee',
                  marginBottom: '10px',
                  lineHeight: '30px'
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
