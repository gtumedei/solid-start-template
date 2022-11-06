import { Component, createSignal, ParentComponent } from "solid-js"
import { Dynamic } from "solid-js/web"
import { Outlet, Route } from "solid-start"

const [layout, setLayout] = createSignal<Component>(() => <><Outlet /></>)

export const createLayout = (component: Component): ParentComponent => {
  setLayout(() => component)
  return (props) => <>{props.children}</>
}

export const LayoutRoute: ParentComponent = (props) =>
  <Route path="/" component={() => <Dynamic component={layout()} />}>
    {props.children}
  </Route>
