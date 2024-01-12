import { createSignal } from "solid-js"
import TablerMinus from "~icons/tabler/minus"
import TablerPlus from "~icons/tabler/plus"

const Counter = () => {
  const [count, setCount] = createSignal(0)
  return (
    <div class="w-52 flex items-center rounded-full bg-gray-100 border-2 border-gray-300 focus-within:border-gray-400 active:border-gray-400 p-2">
      <button
        class="h-12 w-12 inline-flex justify-center items-center rounded-full hover:bg-black/10 transition-colors"
        onClick={() => setCount((c) => c - 1)}
      >
        <TablerMinus />
      </button>
      <span class="grow font-medium">Count: {count()}</span>
      <button
        class="h-12 w-12 inline-flex justify-center items-center rounded-full hover:bg-black/10 transition-colors"
        onClick={() => setCount((c) => c + 1)}
      >
        <TablerPlus />
      </button>
    </div>
  )
}

export default Counter
