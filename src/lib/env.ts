import { isServer } from "solid-js/web"
import { type SafeParseSuccess, z, type ZodFormattedError } from "zod"

export const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  TEST_VARIABLE: z.string()
})

export const clientSchema = z.object({
  MODE: z.enum(["development", "production", "test"]).default("development"),
  VITE_TEST_VARIABLE: z.string()
})

const formatErrors = (errors: ZodFormattedError<Map<string, string>, string>) =>
  Object.entries(errors)
    .map(([name, value]) => value && "_errors" in value ? `${name}: ${value._errors.join(", ")}\n` : undefined)
    .filter(Boolean)

const parsedServerEnv = serverSchema.safeParse(isServer ? process.env : {})

// Skip error checking on the client
if (isServer && parsedServerEnv.success === false) {
  console.error("❌ Invalid environment variables:\n", ...formatErrors(parsedServerEnv.error.format()))
  throw new Error("Invalid environment variables")
}

const serverEnv = (parsedServerEnv as SafeParseSuccess<z.infer<typeof serverSchema>>).data

const parsedClientEnv = clientSchema.safeParse(import.meta.env)

if (parsedClientEnv.success === false) {
  console.error("❌ Invalid environment variables:\n", ...formatErrors(parsedClientEnv.error.format()))
  throw new Error("Invalid environment variables")
}

const clientEnv = parsedClientEnv.data

const env = {
  server: serverEnv,
  client: clientEnv
}

export default env
