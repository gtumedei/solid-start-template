import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const Todos = sqliteTable("todos", {
  id: int().primaryKey({ autoIncrement: true }),
  content: text().notNull(),
  completed: int({ mode: "boolean" }).notNull().default(false),
})

export type Todo = typeof Todos.$inferSelect
export type TodoInsert = typeof Todos.$inferInsert
