import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import VirtualList from './components/useVirtualList/demo';
import Unmount from './components/useUnmount/demo';
import EventListener from './components/useEventListener/demo';
import Test from './components/test';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/virtual-list',
    element: <VirtualList />
  },
  {
    path: '/test',
    element: <Test />
  },
  {
    path: '/unmount',
    element: <Unmount />
  },
  {
    path: '/event-listener',
    element: <EventListener />
  }
]);

export function NavigationBar() {
  return (
    <div>
      <a href={'/'} style={{ paddingRight: '20px' }}>
        home
      </a>
      <a href={'/virtual-list'} style={{ paddingRight: '20px' }}>
        virtual-list
      </a>
      <a href={'/test'} style={{ paddingRight: '20px' }}>
        test
      </a>
      <a href={'/event-listener'} style={{ paddingRight: '20px' }}>
        event-listener
      </a>
      <a href={'/unmount'}>useUnmount</a>
    </div>
  );
}
