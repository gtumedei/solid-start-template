import nprogress from "nprogress"
import { createEffect } from "solid-js"
import { useIsRouting } from "solid-start"

export const createProgress = () => {
  const isRouting = useIsRouting()
  createEffect(() => isRouting() ? nprogress.start() : nprogress.done())
}
