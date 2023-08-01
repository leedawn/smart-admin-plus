import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { NavigationBar, router } from './router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  //   <React.StrictMode>
  <>
    <NavigationBar />
    <RouterProvider router={router} />
  </>
  //   </React.StrictMode>
);

const importModule = (m: string) => import(`./locales/${m}.js`);
importModule('zh_CN');
