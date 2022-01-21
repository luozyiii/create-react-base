# create-react-base

基于 create-react-app 的基础项目框架

## 规范化代码风格

参考 [prettierrc-best](https://github.com/luozyiii/prettierrc-best)

## 使用 craco （一个对 create-react-app 进行自定义配置的社区解决方案）

- 1.依赖安装

```bash
npm install @craco/craco
```

- 2.根目录新增 craco.config.js

```js
module.exports = {
  // ...
};
```

- 3.修改 package.json 配置

```js
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "craco eject",
  "format": "npx prettier --write ."
}
```

### 路径别名

- 1.修改 craco.config.js

```js
const path = require('path');
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src')
    }
  }
};
```

- 修改 tsconfig.json

```js
"compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
```

### 配置 less

- 1.安装 craco-less

```bash
npm install craco-less
```

- 2.并修改 craco.config.js

```js
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
```

## 抽离 API 层，二次封装 axios

- 第一步：确定想要的效果

```js
api.user.loginIn(params).then(() => {});
```

- 目录结构, 具体实现可看源码; 为了防止接口被更改，使用了 Object.freeze

```bash
├── src # 源码目录
│   │── api                     # 接口目录
│   │   │── index.ts            # 暴露出去的访问入口
│   │   │── shop.ts             # shop 模块的接口
│   │   └── user.ts             # user 模块的接口
│   └── services                # services 层
│       │── index.ts            # 请求库(axios) 的二次封装
│       └── config.ts           # config 配置
```

- 优化前: src/api/index.ts

```js
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
```

- 优化: 使用 require.context 批量导入接口

```bash
npm i @types/webpack-env @types/node -D
```

```js
// src/api/index.ts
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
```

### http-proxy-middleware 代理：解决本地开发跨域问题

[文档 link](https://create-react-app.dev/docs/proxying-api-requests-in-development/)

```
注意：直接看英文文档，中文文档有点跟不上
```

## react-router-dom v6

- react-loadable 按需加载(研究)

[参考文档](https://reactrouter.com/docs/en/v6/getting-started/overview)

- 依赖安装

```bash
# react-router-dom
npm install react-router-dom
# types
npm i -D @types/react-router-dom
```

### 约定式路由（去中心化）

- 1.最简单的情况

```js
// 以下目录结构
└── pages
    ├── index.tsx
    ├── login
    |      └── index.tsx
    └── 404.tsx

// 会得到以下配置的路由
[
  {path: '/', element: '@/pages/index'},
  {path: '/login', element: '@/pages/login/index'},
  {path: '/404', element: '@/pages/404'},
]
```

- 2.动态路由

```js
约定 `[]` 包裹的文件或文件夹为动态路由。
src/pages/invoice/[id].tsx 会成为 /invoice/:id

// 以后再考虑
src/pages/invoice/[id]/settings.tsx 会成为 /invoice/:id/settings
```
