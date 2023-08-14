// vite.config.ts
import { defineConfig } from "file:///C:/Users/jakog/Documents/github/Entreprise/Toquis/rebuild/front/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/jakog/Documents/github/Entreprise/Toquis/rebuild/front/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    port: 8080
  },
  watch: {
    ignored: ["!**/node_modules/your-package-name/**"]
  },
  build: {
    emptyOutDir: true,
    outDir: "../back/static",
    pulicDir: "../back/template",
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        index: "./src/main.tsx"
      },
      output: {
        entryFileNames: "bundle.js",
        assetFileNames: "[name].[ext]"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqYWtvZ1xcXFxEb2N1bWVudHNcXFxcZ2l0aHViXFxcXEVudHJlcHJpc2VcXFxcVG9xdWlzXFxcXHJlYnVpbGRcXFxcZnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGpha29nXFxcXERvY3VtZW50c1xcXFxnaXRodWJcXFxcRW50cmVwcmlzZVxcXFxUb3F1aXNcXFxccmVidWlsZFxcXFxmcm9udFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvamFrb2cvRG9jdW1lbnRzL2dpdGh1Yi9FbnRyZXByaXNlL1RvcXVpcy9yZWJ1aWxkL2Zyb250L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA4MDgwXG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgaWdub3JlZDogWychKiovbm9kZV9tb2R1bGVzL3lvdXItcGFja2FnZS1uYW1lLyoqJ10sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgb3V0RGlyIDogJy4uL2JhY2svc3RhdGljJyxcbiAgICBwdWxpY0RpcjogJy4uL2JhY2svdGVtcGxhdGUnLFxuICAgIGNzc0NvZGVTcGxpdDogZmFsc2UsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgaW5kZXg6IFwiLi9zcmMvbWFpbi50c3hcIlxuICAgICAgfSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYnVuZGxlLmpzJyxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ1tuYW1lXS5bZXh0XScsXG4gICAgICB9XG4gICAgfSxcblxuICB9XG4gIFxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQWlZLFNBQVMsb0JBQW9CO0FBQzlaLE9BQU8sV0FBVztBQUVsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyx1Q0FBdUM7QUFBQSxFQUNuRDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsYUFBYTtBQUFBLElBQ2IsUUFBUztBQUFBLElBQ1QsVUFBVTtBQUFBLElBQ1YsY0FBYztBQUFBLElBQ2QsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsT0FBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNKLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLE1BQ3BCO0FBQUEsSUFDRjtBQUFBLEVBRUY7QUFFRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
