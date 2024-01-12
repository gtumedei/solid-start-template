import { defineConfig } from "@solidjs/start/config"
import Autoprefixer from "autoprefixer"
import Tailwind from "tailwindcss"
import Nesting from "tailwindcss/nesting"
import Icons from "unplugin-icons/vite"
import InlineCssModules from "vite-plugin-inline-css-modules"

export default defineConfig({
  envPrefix: "PUBLIC_",
  plugins: [
    // @ts-expect-error
    Icons({ compiler: "solid" }),
    // @ts-expect-error
    InlineCssModules(),
  ],
  css: {
    postcss: {
      plugins: [Nesting(), Tailwind(), Autoprefixer()],
    },
  },
})
