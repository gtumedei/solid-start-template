/// <reference types="@solidjs/start/env" />
/// <reference types="unplugin-icons/types/solid" />

import "solid-js"

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      form: boolean
    }
  }
}
