import SolidStart from "solid-start/vite"
import { defineConfig } from "vite"
import Icons from "unplugin-icons/vite"
import InlineCssModules from "vite-plugin-inline-css-modules"

export default defineConfig({
  plugins: [
    SolidStart(),
    Icons({ compiler: "solid" }),
    InlineCssModules()
  ]
})
