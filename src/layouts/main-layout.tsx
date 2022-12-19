import { Outlet } from "solid-start"
import { css } from "vite-plugin-inline-css-modules"
import AppMenu from "~/components/app-menu"
import { createLayout } from "~/lib/layout"

export const MainLayout = createLayout(() => {
  return (
    <div class={style.layout}>
      <AppMenu />
      <Outlet />
    </div>
  )
})

const style = css`
  .layout {
    @apply w-full max-w-3xl;

    main {
      @apply text-center mx-auto text-gray-700 p-4;
    }
  }
`
