import { createEffect, createMemo, createProjection, createStore } from "solid-js"
import type { ZodType } from "zod"

export const createForm = <TSchemaOutput extends Record<string, unknown>, TSchemaInput>({
  schema,
  initialValues,
  onSubmit,
}: {
  schema: ZodType<TSchemaOutput, TSchemaInput>
  initialValues: TSchemaOutput
  onSubmit: (values: TSchemaOutput) => void
}) => {
  const [fields, setFields] = createStore<TSchemaOutput>({ ...initialValues } as any)

  const [touched, setTouched] = createStore<Record<keyof TSchemaOutput, boolean>>(
    Object.keys(initialValues).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {} as Record<keyof TSchemaOutput, boolean>,
    ) as any,
  )

  createEffect(
    () => {
      const dirty: (keyof TSchemaOutput)[] = []
      for (const key in fields) {
        if (!touched[key as keyof TSchemaOutput] && fields[key] !== initialValues[key]) {
          dirty.push(key as keyof TSchemaOutput)
        }
      }
      return dirty
    },
    (dirty) => {
      if (!dirty.length) return
      setTouched((draft) => {
        for (const key of dirty) draft[key] = true
      })
    },
  )

  const errors = createProjection<Partial<Record<keyof TSchemaOutput, string>>>((draft) => {
    for (const key in draft) delete draft[key as keyof TSchemaOutput]

    const result = schema.safeParse(fields)
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof TSchemaOutput
        if (touched[key] && !draft[key]) draft[key] = issue.message
      }
    }
  }, {})

  const isValid = createMemo(() => schema.safeParse(fields).success)

  const reset = () => {
    setFields(() => ({ ...initialValues }) as any)
    setTouched((draft) => {
      for (const key in draft) draft[key] = false
    })
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault()

    setTouched((draft) => {
      for (const key in draft) draft[key] = true
    })

    const result = schema.safeParse(fields)
    if (result.success) onSubmit(result.data)
  }

  return { fields, setFields, errors, touched, isValid, reset, handleSubmit }
}
