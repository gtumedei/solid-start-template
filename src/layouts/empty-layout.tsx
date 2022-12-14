import { Outlet } from "solid-start"
import { createLayout } from "~/lib/layout"

export const EmptyLayout = createLayout(() => <><Outlet /></>)
