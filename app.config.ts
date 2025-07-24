import { defineConfig } from "@solidjs/start/config"
import Tailwind from "@tailwindcss/vite"
import Icons from "unplugin-icons/vite"
import InlineCssModules from "vite-plugin-inline-css-modules"

export default defineConfig({
  vite: () => ({
    envPrefix: "PUBLIC_",
    plugins: [Tailwind(), Icons({ compiler: "solid" }), InlineCssModules()],
  }),
})
