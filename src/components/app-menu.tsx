import { A } from "solid-start"

const AppMenu = () => {
  return (
    <nav class="flex justify-center gap-4 p-4">
      <A href="/" inactiveClass="text-sky-600 hover:underline">Home</A>
      <A href="/about" inactiveClass="text-sky-600 hover:underline">About</A>
    </nav>
  )
}

export default AppMenu
