import { createSignal } from "solid-js"

const Counter = () => {
  const [count, setCount] = createSignal(0)
  return (
    <button
      class="btn w-[200px]"
      onClick={() => setCount(c => c + 1)}
    >Clicks: {count()}</button>
  )
}

export default Counter
