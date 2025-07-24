import { action, query } from "@solidjs/router"
import { ZodType } from "zod"
import { $ZodIssue } from "zod/v4/core"

/**
 * Wrap a function in Solid Router's `query` and validate its payload client-side with Zod.
 */
export const safeQuery = <TSchema, TSchemaInput, TOutput>(
  querySchema: ZodType<TSchema, TSchemaInput>,
  queryFn: (payload: TSchema) => TOutput | Promise<TOutput>,
  queryKey: string
) =>
  query(async (rawPayload: TSchema) => {
    const payload = validated(rawPayload, querySchema)
    const res = await queryFn(payload)
    return res
  }, queryKey)

/**
 * Wrap a function in Solid Router's `action` and validate its payload client-side with Zod.
 */
export const safeAction = <TSchema, TSchemaInput, TOutput>(
  actionSchema: ZodType<TSchema, TSchemaInput>,
  actionFn: (payload: TSchema) => TOutput | Promise<TOutput>
) =>
  action(async (rawPayload: TSchema) => {
    const payload = validated(rawPayload, actionSchema)
    const res = await actionFn(payload)
    return res
  })

export const validated = <TSchema, TSchemaInput>(
  payload: unknown,
  schema: ZodType<TSchema, TSchemaInput>
): TSchema => {
  const res = schema.safeParse(payload)
  if (res.error) throw new ValidationError(res.error.issues)
  return res.data
}

export class ValidationError extends Error {
  issues: $ZodIssue[]

  constructor(issues: $ZodIssue[]) {
    super()
    this.issues = issues
  }
}
