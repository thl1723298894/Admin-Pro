### 课程导读

基于Vue3 Vite4 从0到1搭建一个前端脚手架，集成企业里面的代码规范和标准
这个是企业级的中后台框架

### 前置条件

- 做过vue的项目
- 对Vue语法了解
- 知道webpack vite这样的构建工具

### 项目使用的依赖：

- 使用 Vite4 进行项目构建
- 使用 TypeScript
- 使用 less 编写样式
- 对 pinia，vue-router，axios 进行模块化封装
- 使用 CommitLint，ESLint，StyleLint，Prettier，LintStage 进行团队项目规范
- 使用 ElementPlus 组件库

### 项目目录结构

```markdown
vite-typescrit-vue3-template/
|- .husky/ # git钩子配置
|- dist/ # 项目打包后的目录
|- mock/ # 数据请求模拟
|- public/ # 不经过打包的静态资源
|- type/ # ts类型定义
|- src/ # 项目资源
|- api/ # ajax http请求管理
|- assets/ # 经过打包的静态资源
|- components/ # 通用组件
|- router/ # 项目路由管理
|- store/ # 组件状态管理
|- styles/ # 项目通用样式
|- utils/ # 工具函数
|- request/ # axios封装
|- views/ # 页面组件
```

### 安装依赖

以pnpm作为依赖管理

```markdown
pnpm install axios pinia pinia-plugin-persistedstate vue vue-router nprogress

# 本项目使用 element plus 大家可以根据个人习惯选择自己常用的组件库

pnpm install element-plus @element-plus/icons-vue

pnpm install -D typescript less
```

下面简单介绍一下这些依赖的作用，大家根据个人习惯选择安装即可。

- vue：这个应该不用多说
- axios：vue官方推荐http请求库
- pinia：vue官方推荐状态管理工具
- pinia-plugin-persistedstate：pinia数据持久化插件
- vue-router：路由管理工具
- typescript：使用TS语言
- less：css预处理
- element-plus：亲民老牌组件库
- nprogres：简洁美观的进度加载条组件

**首先应该搭建一个基础的Vue项目结构**

```json

    |- public/    # 不经过打包的静态资源
    |- src/        # 项目资源
        |- assets/    # 经过打包的静态资源
        |- components/    # 通用组件
        |- styles/    # 项目通用样式
        |- http/    #  axios封装函数
            |- requtest.ts/ # axios封装
        |- views/    # 页面组件
        |- App.vue  # 项目的主组件
        |- main.ts    # 入口ts文件
    | - index.html # 入口html文件
```

### vue

**index.html**

- 对页面进行基础配置

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>企业级中台管理系统-模板</title>
  </head>
  <body>
    <!-- 令 id="app" 便于vue进行挂载 -->
    <div id="app"></div>
    <!-- 引入main.ts文件 -->
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

**/src/App.vue**

- 编写项目的主组件

```vue
<template>
  <!-- 一般vue项目都会使用vue-router -->
  <!-- 所以我们这里直接写一个 router-view -->
  <router-view></router-view>
</template>
<script setup></script>
```

**/src/styles/reset.less**

- **reset.less**是进行一个对基础HTML默认样式的重置
- 这部分也是根据个人习惯配置即可
- 这里引用一个开源项目：[minireset.css](https://github.com/jgthms/minireset.css/blob/master/minireset.css)

```css
html,
body,
p,
ol,
ul,
li,
dl,
dt,
dd,
blockquote,
figure,
fieldset,
legend,
textarea,
pre,
iframe,
hr,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}

ul {
  list-style: none;
}

button,
input,
select {
  margin: 0;
}

html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

img,
video {
  height: auto;
  max-width: 100%;
}

iframe {
  border: 0;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

td,
th {
  padding: 0;
}
```

**/src/main.ts**

- 引入样式文件，挂载Vue

```vue
import { createApp } from 'vue'; import App from './App.vue'; import
'./styles/reset.less'; const app = createApp(App); app.mount('#app');
```

**/views/TlButton.vue**
创建页面结构

```
views/
    |- home/    # 页面文件
        |- components/    # 放置页面使用的组件
            |- TlButton.vue
        |- index.vue    # 经过打包的静态资源
```

我们这里可以随便写一个简单的组件

```vue
<template>
  <div>Hello Vue3</div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped></style>
```

### vue-router

- 然后我们需要进行对路由的配置

**/src/router/index.ts**

- 这里路径中用到了 **@** 是我们配置的别名，指向了src，在后面会讲解到如何配置

```typescript
import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouteRecordRaw,
} from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 配置路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/viwes/home/index.vue"),
    meta: {},
    children: [],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach((_to) => {
  NProgress.done();
});

export default router;
```

**/src/main.ts**

- 在main.ts中，令app使用router插件

```vue
import { createApp } from 'vue'; import App from './App.vue'; import router from
'@/router'; // ++ import './styles/reset.less'; const app = createApp(App);
app.use(router); // ++ app.mount('#app');
```

### pinia

**/src/store/index.ts**

```vue
import { createPinia } from 'pinia'; import piniaPluginPersistedstate from
'pinia-plugin-persistedstate'; const pinia = createPinia(); //
使用pinia数据持久化插件 pinia.use(piniaPluginPersistedstate); export default
pinia;
```

**/src/main.ts**

- 在main.ts中，令app使用store插件

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import pinia from "@/store"; // ++
import "./styles/reset.less";
const app = createApp(App);
app.use(router);
app.use(pinia); // ++
app.mount("#app");
```

### axios

**/src/utils/request.ts**

```typescript
import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

const service: AxiosInstance = axios.create({
  baseURL: '/'
    timeout: 15000,
  });

// axios实例拦截请求
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// axios实例拦截响应
service.interceptors.response.use(
  (response: AxiosResponse) => {
  },
  (error: any) => {
  }
);

export default service
```

## 构建工具

- 我们已经将vue3的基础项目结构搭建完毕，那么我们怎么才能让这个项目跑起来呢？
- 因为浏览器是不能识别Vue，TS，Sass这些语言的，所以我们需要一个工具将它们转变成浏览器可以识别的语言：Html，CSS，JS。Vite就可以做到这些事情，接下来教大家配置Vite帮助我们构建项目。

### 安装依赖

```bash
pnpm install -D vite @vitejs/plugin-vue @vitejs/plugin-vue-jsx

pnpm install -D @types/node @types/nprogress vue-tsc
```

- vite：项目构建工具
- @vitejs/plugin-vue：使vite能够编译vue组件
- @vitejs/plugin-vue-jsx：使vite能够编译jsx组件
- @types/node：node类型包，使ts支持node
- @types/nprogress：nprogress的类型支持
- vue-tsc：vue文件的类型检查工具

### vite环境变量

Vite官方文档对环境变量的介绍：[环境变量和模式 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/env-and-mode.html)

- Vite 在一个特殊的 **import.meta.env** 对象上暴露环境变量。
- 我们为了配置方便，可以将一些配置项写在环境变量中。

**我们在项目根目录下新建三个文件**：**.env**，**.env.production**，**.env.development**

- .env：所有情况下都会加载
- .env.[mode]：只在指定模式下加载

:::warning
npm run dev 会加载 .env 和 .env.development 内的配置
npm run build 会加载 .env 和 .env.production 内的配置
mode 可以通过命令行 --mode 选项来重写。
:::

**.env**

- **注意**：环境变量名称必须与VITE\_作为前缀，前缀可以在Vite配置中修改

```xml
# axios请求的 baseURL
VITE_APP_API_BASEURL = /api
```

- 剩下的**.env.[mode]**之后会介绍到，这里我们就先配置这一项即可

**/src/utils/request.ts**

```typescript
const service: AxiosInstance = axios.create({
  // 这样我们就可以在环境变量中改变 axios 的 baseURL
  baseURL: import.meta.env.VITE_APP_API_BASEURL
    timeout: 15000,
  });
```

### 环境变量类型支持

我们在开发过程中，环境变量可能会越来越多，我们可能想要获得智能的TypeScript语法提示来让我们知道有哪些环境变量。
在项目根目录下新建**types**文件夹
**/types/env.d.ts**

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 我们每次添加完新的环境变量就在此添加一次ts类型
  // 这样我们就能在使用 import.meta.env 时获得ts语法提示
  readonly VITE_APP_API_BASEURL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### vite配置文件

**vite.config.ts**

- 在项目根目录下创建 **vite.config.ts** 文件
- 下面的配置项的解释均已注释
- 官网有更加详细的配置介绍：[配置 Vite | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/config/)

```typescript
import { defineConfig, loadEnv } from "vite";
import type { UserConfig, ConfigEnv } from "vite";
import { fileURLToPath } from "url";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 获取当前工作目录
  const root = process.cwd();
  // 获取环境变量
  const env = loadEnv(mode, root);
  return {
    // 项目根目录
    root,
    // 项目部署的基础路径
    base: "/",
    publicDir: fileURLToPath(new URL("./public", import.meta.url)), // 无需处理的静态资源位置
    assetsInclude: fileURLToPath(new URL("./src/assets", import.meta.url)), // 需要处理的静态资源位置
    plugins: [
      // Vue模板文件编译插件
      vue(),
      // jsx文件编译插件
      vueJsx(),
    ],
    // 运行后本地预览的服务器
    server: {
      // 是否开启https
      https: false,
      // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
      host: true,
      // 开发环境预览服务器端口
      port: 3000,
      // 启动后是否自动打开浏览器
      open: false,
      // 是否开启CORS跨域
      cors: true,
      // 代理服务器
      // 帮助我们开发时解决跨域问题
      proxy: {
        // 这里的意思是 以/api开头发送的请求都会被转发到 http://xxx:3000
        "/api": {
          target: "http://xxx:9000",
          // 改变 Host Header
          changeOrigin: true,
          // 发起请求时将 '/api' 替换为 ''
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    // 打包配置
    build: {
      // 关闭 sorcemap 报错不会映射到源码
      sourcemap: false,
      // 打包大小超出 400kb 提示警告
      chunkSizeWarningLimit: 400,
      rollupOptions: {
        // 打包入口文件 根目录下的 index.html
        // 也就是项目从哪个文件开始打包
        input: {
          index: fileURLToPath(new URL("./index.html", import.meta.url)),
        },
        // 静态资源分类打包
        output: {
          format: "esm",
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
    // 配置别名
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "#": fileURLToPath(new URL("./types", import.meta.url)),
      },
    },
  };
});
```

### ts配置文件

- 项目根目录下新建**tsconfig.json**

**/tsconfig.json**

```json
{
  "compilerOptions": {
    // 编译出JS的目标ES版本
    "target": "esnext",
    // 使用的ES版本
    "module": "esnext",
    "allowJs": false,
    // 用于选择模块解析策略，有'node'和'classic'两种类型
    "moduleResolution": "node",
    // 开启严格模式
    "strict": true,
    // 强制代码中使用的模块文件名必须和文件系统中的文件名保持大小写一致
    "forceConsistentCasingInFileNames": true,
    // 允许使用 xxx 代替 * as xxx 导入
    "allowSyntheticDefaultImports": true,
    // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "jsx": "preserve",
    // 用来指定编译时是否生成.map文件
    "sourceMap": true,
    // 通过为导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性
    "esModuleInterop": true,
    // 是否可以导入 json module
    "resolveJsonModule": true,
    // 是否检测定义了但是没使用的变量
    "noUnusedLocals": true,
    // 是否检查是否有在函数体中没有使用的参数
    "noUnusedParameters": true,
    // 是否启用实验性的装饰器特性
    "experimentalDecorators": true,
    // ts中可以使用的库 这里配置为 dom 与 es模块
    "lib": ["dom", "esnext"],
    // 不允许变量或函数参数具有隐式any类型
    "noImplicitAny": false,
    // 启用阻止对下载库的类型检查
    "skipLibCheck": true,
    // types用来指定需要包含的模块
    "types": ["vite/client", "element-plus/global"],
    // 编译的时候删除注释
    "removeComments": true,
    // 使用绝对路径时使用baseUrl去解析导入路径
    "baseUrl": ".",
    // 为导入路径配置别名
    "paths": {
      "@/*": ["src/*"],
      "#/*": ["types/*"]
    },
    // 配置虚拟目录
    "rootDirs": []
  },
  // 指定需要编译文件
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "types/**/*.d.ts",
    "types/**/*.ts",
    "build/**/*.ts",
    "build/**/*.d.ts",
    "mock/**/*.ts",
    "vite.config.ts"
  ],
  // 指定不需要编译的文件
  "exclude": ["node_modules", "dist", "**/*.js"]
}
```

### 指令配置

- 最后我们将构建指令加入 package.json中

**/package.json**

```
"scripts": {
   "dev": "vite --mode development",
   // 先进行语法检查 再进行项目打包
   "build": "vite build",
},
```

**接下来我们就可以运行项目**

```bash
pnpm run dev
```
