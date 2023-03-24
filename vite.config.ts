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
    optimizeDeps: {
      include: [
        'vue',
        'element-plus/es',
        'element-plus/es/components/form/style/index',
        'element-plus/es/components/radio-group/style/index',
        'element-plus/es/components/radio/style/index',
        'element-plus/es/components/checkbox/style/index',
        'element-plus/es/components/checkbox-group/style/index',
        'element-plus/es/components/switch/style/index',
        'element-plus/es/components/time-picker/style/index',
        'element-plus/es/components/date-picker/style/index',
        'element-plus/es/components/col/style/index',
        'element-plus/es/components/form-item/style/index',
        'element-plus/es/components/alert/style/index',
        'element-plus/es/components/breadcrumb/style/index',
        'element-plus/es/components/select/style/index',
        'element-plus/es/components/input/style/index',
        'element-plus/es/components/breadcrumb-item/style/index',
        'element-plus/es/components/tag/style/index',
        'element-plus/es/components/pagination/style/index',
        'element-plus/es/components/table/style/index',
        'element-plus/es/components/table-column/style/index',
        'element-plus/es/components/card/style/index',
        'element-plus/es/components/row/style/index',
        'element-plus/es/components/button/style/index',
        'element-plus/es/components/menu/style/index',
        'element-plus/es/components/sub-menu/style/index',
        'element-plus/es/components/menu-item/style/index',
        'element-plus/es/components/option/style/index',
        'element-plus/es/components/base/style/css',
        'element-plus/es/components/table-v2/style/css',
        '@element-plus/icons-vue',
        'pinia',
        'axios',
        'vue-router',
        '@vueuse/core',
      ],
    },
    base: './',
    build: {
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
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BAG_INTERFACE_PORT,
          changeOrigin: true,
          rewrite(path) {
            return path.replace(`/^${env.VITE_APP_BASE_API}/`, env.VITE_APP_BASE_API)
          },
        }
      }
    }
  }
})
