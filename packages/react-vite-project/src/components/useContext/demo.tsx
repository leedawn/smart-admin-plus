import { createContext, useContext } from 'react';
import './demo.module.less';

const ThemeContext = createContext('');
export function UseContextDemo() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  );
}

function Form() {
  const className = useContext(ThemeContext);
  return (
    <div style={{ width: '200px', height: '50px' }}>
      <span className={className}>welcome</span>
    </div>
  );
}
