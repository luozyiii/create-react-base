import services from '../services';
import user from './user';
import shop from './shop';

function apiFun() {
  const api: any = {};

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

  return {
    getApi: function () {
      return api;
    },
    register
  };
}

const wapi = apiFun();
wapi.register('user', user);
wapi.register('shop', shop);

export default wapi.getApi();
