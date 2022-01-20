import services from '@/services';

const moduleFiles = require.context('@/api', true, /.ts$/);

let moduleKeys = moduleFiles.keys().filter((v) => v !== './index.ts');

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

// 自动注册
moduleKeys.forEach((v) => {
  console.log(moduleFiles(v).default);
  let keys = v.split('.')[1].slice(1);
  if (keys) register(`${keys}`, moduleFiles(v).default);
});

Object.freeze(api);

export default api;
