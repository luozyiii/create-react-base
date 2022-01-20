const user = {
  loginIn: { method: 'get', url: 'admin/user/login' },
  loginOut: { method: 'get', url: 'admin/user/logout' },
  checkPwd: { method: 'post', url: 'admin/user/checkPwd' }
};

export default user;
