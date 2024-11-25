// vite.config.js
import { defineConfig } from "file:///mnt/c/Users/hh_ga/Documents/AppAcademy/Illbrb/pair-ill-brb/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///mnt/c/Users/hh_ga/Documents/AppAcademy/Illbrb/pair-ill-brb/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import eslint from "file:///mnt/c/Users/hh_ga/Documents/AppAcademy/Illbrb/pair-ill-brb/frontend/node_modules/vite-plugin-eslint/dist/index.mjs";
var vite_config_default = defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslint({
      lintOnStart: true,
      failOnError: mode === "production"
    })
  ],
  // To automatically open the app in the browser whenever the server starts,
  // uncomment the following lines:
  server: {
    watch: { usePolling: true },
    open: true,
    proxy: {
      "/api": "http://localhost:8000"
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvaGhfZ2EvRG9jdW1lbnRzL0FwcEFjYWRlbXkvSWxsYnJiL3BhaXItaWxsLWJyYi9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL21udC9jL1VzZXJzL2hoX2dhL0RvY3VtZW50cy9BcHBBY2FkZW15L0lsbGJyYi9wYWlyLWlsbC1icmIvZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL21udC9jL1VzZXJzL2hoX2dhL0RvY3VtZW50cy9BcHBBY2FkZW15L0lsbGJyYi9wYWlyLWlsbC1icmIvZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IGVzbGludCBmcm9tIFwidml0ZS1wbHVnaW4tZXNsaW50XCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBlc2xpbnQoe1xuICAgICAgbGludE9uU3RhcnQ6IHRydWUsXG4gICAgICBmYWlsT25FcnJvcjogbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCIsXG4gICAgfSksXG4gIF0sXG4gIC8vIFRvIGF1dG9tYXRpY2FsbHkgb3BlbiB0aGUgYXBwIGluIHRoZSBicm93c2VyIHdoZW5ldmVyIHRoZSBzZXJ2ZXIgc3RhcnRzLFxuICAvLyB1bmNvbW1lbnQgdGhlIGZvbGxvd2luZyBsaW5lczpcbiAgc2VydmVyOiB7XG4gICAgd2F0Y2g6IHsgdXNlUG9sbGluZzogdHJ1ZSB9LFxuICAgIG9wZW46IHRydWUsXG4gICAgcHJveHk6IHtcbiAgICAgIFwiL2FwaVwiOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMFwiLFxuICAgIH0sXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThYLFNBQVMsb0JBQW9CO0FBQzNaLE9BQU8sV0FBVztBQUNsQixPQUFPLFlBQVk7QUFHbkIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxhQUFhO0FBQUEsTUFDYixhQUFhLFNBQVM7QUFBQSxJQUN4QixDQUFDO0FBQUEsRUFDSDtBQUFBO0FBQUE7QUFBQSxFQUdBLFFBQVE7QUFBQSxJQUNOLE9BQU8sRUFBRSxZQUFZLEtBQUs7QUFBQSxJQUMxQixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
