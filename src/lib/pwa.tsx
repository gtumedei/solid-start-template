import { createSignal, Show } from "solid-js"
import { isServer } from "solid-js/web"
import { useRegisterSW } from "virtual:pwa-register/solid"

const [needRefresh, setNeedRefresh] = createSignal(false)
let updateSw: ReturnType<typeof useRegisterSW>["updateServiceWorker"] | undefined = undefined

export const registerPwa = () => {
  if (!isServer) {
    const { updateServiceWorker } = useRegisterSW({
      onNeedRefresh: async () => {
        setNeedRefresh(true)
        updateSw = updateServiceWorker
      }
    })
  }
}

export const PwaUpdatePrompt = () => {
  return (
    <Show when={needRefresh()}>
      <button class="btn fixed bottom-4 right-4" onClick={() => updateSw?.()}>Click to update</button>
    </Show>
  )
}
