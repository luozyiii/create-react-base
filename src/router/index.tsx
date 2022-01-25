import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { exclude } from './config';
import NotFount from '@/pages/404';

function MyRouter() {
  // 约定式路由： 核心API require.context
  const routerFiles: any = {};

  function importAll(r: any) {
    r.keys().forEach((key: any) => (routerFiles[key] = r(key)));
  }

  importAll(require.context('@/pages', true, /\.tsx$/));
  let routesPaths = Object.keys(routerFiles).filter((path: string) => {
    let bl = true;
    exclude &&
      exclude.forEach((name) => {
        if (path.includes(name)) {
          bl = false;
        }
      });
    return bl;
  });
  console.log('routesPaths:', routesPaths);

  /**
   * 文件路径转换成路由路径; 如下:
   *    "./index.tsx"       => "/"
   *    "./home/index.tsx" => "/home"
   */
  const handlePath = (path: string) => {
    let lastPath = path.split('.')[1];
    let start = lastPath.indexOf('[');
    let end = lastPath.indexOf(']');
    if (lastPath === '/index') {
      lastPath = '/';
    } else if (lastPath.substring(lastPath.length - 6) === '/index') {
      lastPath = lastPath.substring(0, lastPath.length - 6);
    } else if (start && end && start < end) {
      lastPath = lastPath.replace('[', ':');
      lastPath = lastPath.replace(']', '');
    }
    return lastPath;
  };

  // const SyncComponent = React.lazy(() => import(/* webpackChunkName: "sync" */ '@/pages/sync/index'));

  return (
    <BrowserRouter>
      <Routes>
        {routesPaths.length &&
          routesPaths.map((p, key) => {
            let path = handlePath(p);
            let Element = routerFiles[p].default;

            return <Route key={key} path={path} element={<Element />} />;
          })}
        {/* <Route
          path="/sync"
          element={
            <React.Suspense fallback={<p>Loading...</p>}>
              <SyncComponent />
            </React.Suspense>
          }
        ></Route> */}
        <Route path="*" element={<NotFount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRouter;
