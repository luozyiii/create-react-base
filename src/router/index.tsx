import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '@/pages/home';
import About from '@/pages/about';
import Message from '@/pages/message';

let routerList = [
  {
    path: '/',
    component: <Home />
  },
  {
    path: '/about',
    component: <About />,
    routes: [
      {
        path: '/home',
        component: <Home />
      }
    ]
  },
  {
    path: '/message',
    component: <Message />
  },
  {
    path: '/message/abc',
    component: <Home />
  }
];

// https://reactrouter.com/docs/en/v6/getting-started/overview

function MyRouter() {
  const renderRoutes = (list: any) => {
    return (
      <Routes>
        {list &&
          list.map((item: any, key: number) => {
            const { path, component, routes } = item;
            return (
              <Route key={key} path={path} element={component}>
                {routes && renderRoutes(routes)}
              </Route>
            );
          })}
      </Routes>
    );
  };
  return <BrowserRouter>{renderRoutes(routerList)}</BrowserRouter>;
}

export default MyRouter;
