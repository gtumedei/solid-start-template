import { drizzle } from "drizzle-orm/libsql"
import env from "~/lib/env"

export const db = drizzle(env.private.DB_FILE_NAME)
