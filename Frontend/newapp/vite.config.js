// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// import tailwindcss from '@tailwindcss/vite'
// // https://vite.dev/config/
// export default defineConfig({
//   server:{
//     proxy:{
//       "/api":{
//         target:"http://localhost:8000",
//         secure:false
//       }
//     }
//   },
//   plugins: [react(),
//     tailwindcss(),
//   ],
//   assetsInclude: ["**/*.PNG"],
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const headers = {
  "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
};

export default defineConfig({
  server: {
    headers,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        secure: false,
      },
    },
  },
  preview: { headers },
  plugins: [react(), tailwindcss()],
  assetsInclude: ["**/*.PNG"],
});