import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <h3>这是公用头部</h3>
      <Outlet />
    </>
  );
}

export default App;
