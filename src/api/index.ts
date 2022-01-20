import services from '@/services';
import user from './user';
import shop from './shop';

const modelsFile = require.context('@/api', true, /.ts$/);

const models = modelsFile.keys().map((v) => {
  console.log('v:', v);
  return modelsFile(v);
});
console.log(models);

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
  // 冻结对象，不允许修改
  Object.freeze(api[name]);
}

// 注册 或者使用require.context 自动导入注册
register('user', user);
register('shop', shop);

Object.freeze(api);

export default api;
