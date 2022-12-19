import dotenv from "dotenv"
import SolidStart from "solid-start/vite"
import { defineConfig } from "vite"
import Icons from "unplugin-icons/vite"
import InlineCssModules from "vite-plugin-inline-css-modules"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig(() => {
  dotenv.config()
  return {
    plugins: [
      SolidStart(),
      Icons({ compiler: "solid" }),
      InlineCssModules(),
      VitePWA({
        // Use this to test the PWA during dev
        // devOptions: { enabled: true },
        workbox: {
          // Avoid precaching HTML: should be handled by the server with SSR
          globPatterns: ["**/*.{js,css}"],
          // Don't fallback on any HTML document
          navigateFallback: null
        }
      })
    ]
  }
})
