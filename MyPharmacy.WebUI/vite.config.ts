import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import fs from 'fs';
import path from 'path';

const baseFolder =
   process.env.APPDATA !== undefined && process.env.APPDATA !== ""
      ? `${process.env.APPDATA}/ASP.NET/https`
      : `${process.env.HOME}/.aspnet/https`;
    // Start of Selection
    
    const certificateArg = process.argv
       .map((arg) => arg.match(/--name=(.+)/i))
       .filter(Boolean)[0];
    
    const certificateName = certificateArg
       ? certificateArg[1]
   : "reactapp";

if (!certificateName) {
   console.error(
      "Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.",
   );
   process.exit(-1);
}

const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: {
         "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
   },
   server: {
      proxy: {
         "/api": {
            target: "http://localhost:5027/",
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, ""),
         },
      },
      port: 7191,
      https: {
         key: fs.readFileSync(keyFilePath),
         cert: fs.readFileSync(certFilePath),
      },
   },
});

