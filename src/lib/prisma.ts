import { PrismaClient } from "@prisma/client"
import env from "~/lib/env"

export default new PrismaClient({
  log: env.server.NODE_ENV == "development"
    ? ["query", "error", "warn"]
    : ["error"]
})
