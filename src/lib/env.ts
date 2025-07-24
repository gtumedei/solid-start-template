import { isServer } from "solid-js/web"
import { z } from "zod"

export const PrivateEnvSchema = z.object({
  TEST_VARIABLE: z.string(),
})

export const PublicEnvSchema = z.object({
  PUBLIC_TEST_VARIABLE: z.string(),
})

const parsedPrivateEnv = PrivateEnvSchema.safeParse(isServer ? process.env : {})

// Skip error checking on the client
if (isServer && parsedPrivateEnv.success === false) {
  console.error(`Invalid environment variables\n${z.prettifyError(parsedPrivateEnv.error)}`)
  throw new Error("Invalid environment variables")
}

const privateEnv = (parsedPrivateEnv as z.ZodSafeParseSuccess<z.infer<typeof PrivateEnvSchema>>)
  .data

const parsedPublicEnv = PublicEnvSchema.safeParse(import.meta.env)

if (parsedPublicEnv.success === false) {
  console.error(`Invalid environment variables\n${z.prettifyError(parsedPublicEnv.error)}`)
  throw new Error("Invalid environment variables")
}

const publicEnv = parsedPublicEnv.data

const env = {
  private: privateEnv,
  public: publicEnv,
}

export default env
