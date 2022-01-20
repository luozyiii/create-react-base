# react-base

基础项目

## 规范化代码风格

参考 [prettierrc-best](https://github.com/luozyiii/prettierrc-best)

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

- 优化: 使用 require.context 批量导入接口

```bash
npm i @types/webpack-env @types/node -D
```

### http-proxy-middleware 代理：解决本地开发跨域问题

[文档 link](https://create-react-app.dev/docs/proxying-api-requests-in-development/)

```
注意：直接看英文文档，中文文档有点跟不上
```

### 路径别名 react-app-rewired

- 安装依赖库

```bash
npm install react-app-rewired --save-dev

```

- 在项目的根目录创建 config-overrides.js 文件

```js
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

/* config-overrides.js */
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  // alias
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': resolve('src')
  };
  return config;
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

- 修改启动脚本 package.json

```js
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject",
    "format": "npx prettier --write ."
  },
```
