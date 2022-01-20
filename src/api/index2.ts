import services from '../services';
import user from './user';
import shop from './shop';

const api: any = {};

// 注册模块方法
function register(name: string, module: any) {
  api[name] = {};
  for (const key in module) {
    let options = module[key];
    let method = options.method;
    api[name][key] = (params: any) => {
      if (method === 'get') {
        options.params = params;
      } else {
        options.data = params;
      }
      return services.request({ ...options });
    };
  }
}

// 注册 或者使用require.context 自动导入注册
register('user', user);
register('shop', shop);

export default api;
