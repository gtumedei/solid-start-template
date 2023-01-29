import type { FormConfig } from "@felte/core"
import { createForm as createFelteForm } from "@felte/solid"
import { validator } from "@felte/validator-zod"
import { ZodSchema } from "zod"

export const createForm = <TSchema extends Record<string, unknown>>(
  config: FormConfig<TSchema> & { schema: ZodSchema<TSchema> }
) => {
  const { schema, ...rest } = config
  return createFelteForm<TSchema>({
    extend: validator({ schema }),
    ...rest as any
  })
}
