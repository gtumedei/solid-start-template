import { A } from "solid-start"
import { css } from "vite-plugin-inline-css-modules"
import MdiHomeOutline from "~icons/mdi/home-outline"
import MdiInformationOutline from "~icons/mdi/information-outline"
import MdiListBoxOutline from "~icons/mdi/list-box-outline"

const style = css`
  .navItem {
    @apply flex items-center gap-1 hover:underline;
  }

  .active {
    @apply text-sky-600 hover:no-underline;
  }
`

const AppMenu = () => {
  return (
    <nav class="flex justify-center gap-4 p-4">
      <A href="/" class={style.navItem} activeClass={style.active} end>
        <MdiHomeOutline />Home
      </A>
      <A href="/posts" class={style.navItem} activeClass={style.active}>
        <MdiListBoxOutline />Posts
      </A>
      <A href="/about" class={style.navItem} activeClass={style.active}>
        <MdiInformationOutline />About
      </A>
    </nav>
  )
}

export default AppMenu
