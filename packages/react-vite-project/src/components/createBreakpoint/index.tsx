import { useEffect, useMemo, useState } from 'react';

interface Options {
  [key: string]: number;
}

const CreateBreakpoint = (
  options: Options = { large: 1200, big: 700, small: 300 }
) =>
  function GetBreakPoint() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth || 0);

    useEffect(() => {
      function getWidth() {
        setScreenWidth(window.innerWidth);
      }

      window.addEventListener('resize', getWidth);
      return () => {
        window.removeEventListener('resize', getWidth);
      };
    }, []);

    const sortedOptions = useMemo(() => {
      return Object.entries(options).sort((a, b) => a[1] - b[1]);
    }, [options]);

    return sortedOptions.reduce((acc, [name, width]) => {
      if (screenWidth > width) {
        console.log(
          '🚀 ~ returnsortedOptions.reduce ~ screenWidth:',
          screenWidth
        );
        return name;
      } else {
        return acc;
      }
    }, sortedOptions[0][0]);
  };

export default CreateBreakpoint;
