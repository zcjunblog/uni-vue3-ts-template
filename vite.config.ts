/*
 * @Date: 2022-02-14 11:36:04
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-03-21 15:04:21
 * @FilePath: \awen-patient-h5\vite.config.ts
 */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
    // 输出的静态资源的文件夹名称
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                //生产环境时移除console
                drop_console: true,
                drop_debugger: true
            }
        }
    },
    plugins: [
        uni({
            // vueOptions: {
            //     reactivityTransform: true
            // }
        })
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import './src/style/modules/mixin.scss';`
            }
        }
    }
})
