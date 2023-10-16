import App from './App';
import { createBrowserRouter, Link } from 'react-router-dom';
import VirtualList from './components/useVirtualList/demo';
import Unmount from './components/useUnmount/demo';
import EventListener from './components/useEventListener/demo';
import Test from './components/test';
// import ReduxDemo from './components/redux';
import { TwoEffects } from './components/useEffectAndUseLayoutEffect/demo';
import { ReducerDemo } from './components/reducer/demo';
import { createElement } from 'react';
import { UseContextDemo } from './components/useContext/demo';

// TODO: 尝试将下面的内容参数化失败
// const paths = ['/virtual-list'];
// const routerObj: Record<string, any>[] = [];
// paths.forEach((path, index: number) => {
//   routerObj[index] = {};
//   routerObj[index].path = path;
//   routerObj[index].element = (() => {
//     const Transformed = path
//       .slice(1)
//       .split('-')
//       .map((p) => p[0].toUpperCase() + p.slice(1))
//       .join('');
//     console.log(Transformed);
//     return <Transformed />;
//   })();
// });
// console.log(routerObj);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
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
      },
      //   {
      //     path: '/redux',
      //     element: <ReduxDemo />
      //   }
      {
        path: '/two-effects',
        element: <TwoEffects />
      },
      {
        path: '/reducer-demo',
        element: <ReducerDemo />
      }
      //   { path: '/context-demo', element: <UseContextDemo /> }
    ]
  }
]);

export function NavigationBar() {
  return (
    <div>
      <Link to={'/'} style={{ paddingRight: '20px' }}>
        home
      </Link>
      <a href={'/virtual-list'} style={{ paddingRight: '20px' }}>
        virtual-list
      </a>
      <a href={'/test'} style={{ paddingRight: '20px' }}>
        test
      </a>
      <a href={'/redux'} style={{ paddingRight: '20px' }}>
        redux
      </a>
      <a href={'/event-listener'} style={{ paddingRight: '20px' }}>
        event-listener
      </a>
      <a href={'/two-effects'} style={{ paddingRight: '20px' }}>
        two-effects
      </a>
      <a href={'/reducer-demo'} style={{ paddingRight: '20px' }}>
        reducer-demo
      </a>
      {/* <a href={'/context-demo'} style={{ paddingRight: '20px' }}>
        context-demo
      </a> */}
      <a href={'/unmount'}>useUnmount</a>
    </div>
  );
}
