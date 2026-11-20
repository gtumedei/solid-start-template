/**
 * Ambient type declarations for unplugin-icons virtual modules.
 *
 * Replaces `unplugin-icons/types/solid`, which still targets Solid v1 types:
 * it imports `JSX` from `solid-js` (moved to `@solidjs/web` in v2) and uses
 * `ComponentProps<'svg'>` (intrinsic extraction moved to renderer packages).
 * Remove this file once upstream ships Solid v2-compatible declarations.
 */

declare module "~icons/*" {
  import type { JSX } from "@solidjs/web"

  const component: (props: JSX.SVGAttributes<SVGSVGElement>) => JSX.Element
  export default component
}

declare module "virtual:icons/*" {
  import type { JSX } from "@solidjs/web"

  const component: (props: JSX.SVGAttributes<SVGSVGElement>) => JSX.Element
  export default component
}
