import {
  action,
  createMemo,
  createOptimistic,
  createProjection,
  createSignal,
  createStore,
  refresh,
} from "solid-js"
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
  // The form field state. Mutating `props.initialValues` resets it.
  const [fields, setFields] = createStore<TSchemaOutput>(() => initialValues, {
    ...initialValues,
  } as any)

  // Used to track if the form was submitted in order to mark all fields as touched
  const [submitted, setSubmitted] = createSignal(false)

  const touched = createProjection<Record<keyof TSchemaOutput, boolean>>(
    (draft) => {
      for (const key in fields) {
        // A field is touched if the form was submitted or its value is different from the initial one
        draft[key as keyof TSchemaOutput] = submitted() || fields[key] !== initialValues[key]
      }
    },
    Object.keys(initialValues).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {} as Record<keyof TSchemaOutput, boolean>,
    ),
  )

  const errors = createProjection<Partial<Record<keyof TSchemaOutput, string>>>((draft) => {
    for (const key in draft) delete draft[key as keyof TSchemaOutput]

    const result = schema.safeParse(fields)
    if (!result.success) {
      for (const issue of result.error.issues) {
        // A field is errored if it's touched and its key appears among the Zod parsing errors
        const key = issue.path[0] as keyof TSchemaOutput
        if (touched[key] && !draft[key]) draft[key] = issue.message
      }
    }
  }, {})

  // The form is valid if the schema parses successfully
  const isValid = createMemo(() => schema.safeParse(fields).success)
  // A form is only submitting during its submit action (see below)
  const [isSubmitting, setIsSubmitting] = createOptimistic(false)

  const reset = () => {
    // Sync fields back to the initial values
    refresh(fields)
    setSubmitted(false)
  }

  const submit = action(function* (values: TSchemaOutput) {
    // Optimistic, so automatically reverted after the transaction
    setIsSubmitting(true)
    yield onSubmit(values)
    reset()
  })

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    setSubmitted(true)
    const result = schema.safeParse(fields)
    if (result.success) submit(result.data).catch(() => {})
  }

  return { fields, setFields, errors, touched, isValid, isSubmitting, handleSubmit, reset }
}
