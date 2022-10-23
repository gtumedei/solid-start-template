import type { FormConfig } from "@felte/core"
import { createForm as createFelteForm } from "@felte/solid"
import { validator } from "@felte/validator-zod"
import { z } from "zod"

export const createForm = <
  TSchema extends z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>> = any
>(
  config: FormConfig<z.infer<TSchema>> & { schema: TSchema }
) => {
  const { schema, ...rest } = config
  return createFelteForm<z.infer<TSchema>>({
    extend: validator({ schema }),
    ...rest as any
  })
}
