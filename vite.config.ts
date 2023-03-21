import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite';
import vuesetupExtend from "vite-plugin-vue-setup-extend"

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig(({command, mode }) => {
  /** 获取.dev文件中的环境变量 */
  const env = loadEnv(mode, process.cwd());
  console.log(env);   
  return {
    plugins: [
      vue({
        /** vue语法糖,使用 $ref，可以使用不使用【.value】 */
        reactivityTransform: true
      }),
      /** 定义组件的name值 */
      vuesetupExtend(),
      AutoImport({
        //安装两行后你会发现在组件中不用再导入ref，reactive等
        imports: ['vue', 'vue-router'],
        //存放的位置
        dts: "src/auto-import.d.ts",
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        // 引入组件的,包括自定义组件
        // 存放的位置
        dts: "src/components.d.ts",
        resolvers: [ElementPlusResolver()],
      }),
      // createStyleImportPlugin({
      //   resolves: [
      //     VxeTableResolve()
      //   ],
      // }),
    ],
    base: './',
    build: {
      // 无意义，还是需要在f12中手动引入当前文件路径，才能正常debugger
      // sourcemap: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      port: 66,
      open: true,
      hmr: true,
      host: "0.0.0.0",
      proxy: {
        // "/dev-api": {
        //   target: "http://127.0.0.1:8089",
        //   changeOrigin: true,
        //   rewrite(path) {
        //     return path.replace(/^\/dev-api/, "")
        //   },
        // },
        "/gongan-api": {
          target: 'https://vat.zzhcn.net',
          changeOrigin: true,
          rewrite(path) {
            return path.replace(/^\/gongan-api/, "/gongan-api")
          },
        }
      }
    }
  }
})
