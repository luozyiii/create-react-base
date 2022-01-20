import React from 'react';
import api from '@/api';
import logo from './logo.svg';
import './App.css';

import Child from '@/components/Child';

function App() {
  const login = () => {
    // 不允许修改
    // api.user = null;
    // api.user.loginIn = null
    api.user
      .loginIn({ phone: '18825040603', pwd: '123' })
      .then(() => {})
      .catch((err: any) => {
        console.log(err);
      });
  };

  const checkPwd = () => {
    console.log(api);
    api.user
      .checkPwd({ phone: '18825040603', pwd: '123' })
      .then(() => {})
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <button onClick={login}>登录(test get方法)</button>
        <br />
        <button onClick={checkPwd}>修改密码(test post方法)</button>
        <br />
        <Child />
      </header>
    </div>
  );
}

export default App;
