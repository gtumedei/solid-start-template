import solid from "@solidjs/vite-plugin"
import tailwind from "@tailwindcss/vite"
import { fileRoutes } from "filesystem-routing/vite"
import icons from "unplugin-icons/vite"
import { defineConfig } from "vite"
import { nitro } from "nitro/vite"

export default defineConfig({
  plugins: [
    solid({
      // TODO: this should not be required (`start: true` is enough), but right now live updates seem to break if the file names start with a lowercase letter
      start: {
        document: "./src/document.tsx",
        app: "./src/app.tsx",
        middleware: "./src/middleware.ts",
      },
      ssr: true,
      serverFunctions: true,
    }),
    fileRoutes({ httpMethods: true, types: true }),
    tailwind(),
    icons({ compiler: "solid" }),
    nitro(),
  ],
  envPrefix: "PUBLIC_",
  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
  },
  server: { port: 3000 },
  build: {
    target: "esnext",
    assetsInlineLimit: 0,
  },
})
