import React from 'react';
import { Link } from 'react-router-dom';
import api from '@/api';
import './index.less';

import Child from '@/components/Child';

function Home() {
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
    <div className="home-page">
      <header className="content">
        <p>
          <button onClick={login}>登录(test get方法)</button>
        </p>
        <p>
          <button onClick={checkPwd}>修改密码(test post方法)</button>
        </p>
        <Child />
        <div className="page-link">
          <Link to="/about">about page</Link>
          <br />
          <Link to="/message">message page</Link>
        </div>
      </header>
    </div>
  );
}

export default Home;
