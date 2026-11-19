// Basically copied from Solid Primitives (https://github.com/solidjs-community/solid-primitives/blob/main/packages/context/src/index.ts).
// This version returns both an asserted non nullable useContext and a nullable one
// The context provider can also be provided with the full context or with the required props to create it internally

import type { JSX } from "@solidjs/web"
import { createComponent, createContext, useContext } from "solid-js"

type ContextProviderProps = {
  children?: JSX.Element
} & Record<string, unknown>

type ContextProvider<T, P extends ContextProviderProps> = (
  props: { children: JSX.Element; value: T } | ({ children: JSX.Element } & P),
) => JSX.Element

type CreateReturn<T, P extends ContextProviderProps> = [
  provider: ContextProvider<T, P>,
  useContext: () => T,
  useContext: () => T | undefined,
]

export function create<T, P extends ContextProviderProps>(
  factoryFn: (props: P) => T,
  defaults: T,
): CreateReturn<T, P>
export function create<T, P extends ContextProviderProps>(
  factoryFn: (props: P) => T,
): CreateReturn<T, P>
export function create<T, P extends ContextProviderProps>(
  factoryFn: (props: P) => T,
  defaults?: T,
): CreateReturn<T, P> {
  const Context = createContext(defaults)
  return [
    (props) => {
      return createComponent(Context, {
        get value() {
          return "value" in props ? (props as { value: T }).value : factoryFn(props as P)
        },
        get children() {
          return props.children
        },
      })
    },
    () => useContext(Context)!,
    () => useContext(Context),
  ]
}
