import { For } from "solid-js"

const Header = () => {
  return (
    <header class="flex px-6 py-3 border-b border-black/10 relative">
      <nav class="mx-auto">
        <ul class="flex">
          <For
            each={[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/todos", label: "Todos" },
            ]}
          >
            {(item) => (
              <li>
                <a
                  href={item.href}
                  class="inline-flex text-sm font-medium px-3 relative after:[content:''] after:absolute after:-bottom-3.5 after:inset-x-0 after:h-0.5 data-active:after:bg-sky-600"
                >
                  {item.label}
                </a>
              </li>
            )}
          </For>
        </ul>
      </nav>
      <span
        class={[
          "text-xs font-bold uppercase rounded px-2 py-1 absolute-center-y right-6",
          import.meta.env.DEV ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800",
        ]}
      >
        {import.meta.env.DEV ? "dev" : "prod"}
      </span>
    </header>
  )
}

export default Header
