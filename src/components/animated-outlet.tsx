import { Outlet } from "solid-start"
import { Transition } from "solid-transition-group"

const AnimatedOutlet = () => (
  <Transition
    enterClass="opacity-0" exitToClass="opacity-0"
    enterActiveClass="transition-opacity" exitActiveClass="transition-opacity"
    mode="outin"
  >
    <Outlet/>
  </Transition>
)

export default AnimatedOutlet
