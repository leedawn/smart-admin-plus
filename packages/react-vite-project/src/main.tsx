import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import VirtualList from './components/virtual-list/main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/virtual-list',
    element: <VirtualList />
  }
]);

function NavigationBar() {
  return (
    <div>
      <a href={'/'} style={{ paddingRight: '20px' }}>
        home
      </a>
      <a href={'/virtual-list'}>virtual-list</a>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NavigationBar />
    <RouterProvider router={router} />
  </React.StrictMode>
);

const importModule = (m: string) => import(`./locales/${m}.js`);
importModule('zh_CN');
