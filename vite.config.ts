// import { defineConfig } from 'vite';
// import dts from 'vite-plugin-dts';
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
// import pkg from './package.json';

// const COMMON_ONLY = !!process.env['COMMON_ONLY'];
// const ESM_ONLY = !!process.env['ESM_ONLY'];

// export default defineConfig({
// 	plugins: [cssInjectedByJsPlugin(), dts()],
// 	build: {
// 		lib: {
// 			formats: (() => {
// 				if (COMMON_ONLY && ESM_ONLY) {
// 					throw new Error('Cannot set both COMMON_ONLY and ESM_ONLY');
// 				} else if (COMMON_ONLY) {
// 					return ['cjs'];
// 				} else if (ESM_ONLY) {
// 					return ['es'];
// 				}
// 				return ['cjs', 'es'];
// 			})(),
// 			entry: 'src/index.ts',
// 			fileName: '[name]',
// 		},
// 		rollupOptions: {
// 			external: Object.keys(pkg.dependencies),
// 		},
// 	},
// });


import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [cssInjectedByJsPlugin(), dts()],
  server: {
    open: true, // Автоматически открывать браузер
    port: 3000, // Порт сервера
    strictPort: true,
    hmr: true // Hot Module Reloading
  },
  build: {
    watch: {}, // Включаем наблюдение за изменениями
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['@editorjs/editorjs'],
      output: {
        globals: {
          '@editorjs/editorjs': 'EditorJS'
        }
      }
    }
  }
});