import { PrismaClient } from "@prisma/client"
import { serverEnv } from "~/lib/env"

export default new PrismaClient({
  log: serverEnv.NODE_ENV == "development"
    ? ["query", "error", "warn"]
    : ["error"]
})
