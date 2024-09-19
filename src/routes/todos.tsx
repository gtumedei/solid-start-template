import { RouteDefinition, createAsync, reload, useAction } from "@solidjs/router"
import { Component, For } from "solid-js"
import { z } from "zod"
import AppTitle from "~/components/app-title"
import { db } from "~/lib/db"
import { createForm } from "~/lib/form"
import { safeAction, safeQuery } from "~/lib/safe-data"
import TablerPlus from "~icons/tabler/plus"
import TablerX from "~icons/tabler/x"

type Todo = {
  id: number
  content: string
  completed: boolean
}

const getTodos = safeQuery(
  z.void(),
  async () => {
    "use server"
    console.log("getTodos")
    const todos = ((await db.getItem("todos")) ?? []) as Todo[]
    return todos
  },
  "todos"
)

const CreateTodoSchema = z.object({
  content: z.string().min(1),
})

const createTodoAction = safeAction(CreateTodoSchema, async (payload) => {
  "use server"
  console.log("createTodo")
  const todos = ((await db.getItem("todos")) ?? []) as Todo[]
  todos.push({ id: todos.length, content: payload.content, completed: false })
  await db.setItem("todos", todos)
  reload({ revalidate: getTodos.key })
})

const toggleCompletedAction = safeAction(z.object({ id: z.number() }), async (payload) => {
  "use server"
  console.log("toggleCompleted")
  const todos = ((await db.getItem("todos")) ?? []) as Todo[]
  const todo = todos.find((t) => t.id == payload.id)
  if (!todo) return new Error("TODO not found")
  todo.completed = !todo.completed
  await db.setItem("todos", todos)
  reload({ revalidate: getTodos.key })
})

const deleteTodoAction = safeAction(z.object({ id: z.number() }), async (payload) => {
  "use server"
  console.log("deleteTodo")
  let todos = ((await db.getItem("todos")) ?? []) as Todo[]
  todos = todos.filter((t) => t.id != payload.id)
  await db.setItem("todos", todos)
  reload({ revalidate: getTodos.key })
})

const AddTodoForm = () => {
  let contentInput!: HTMLInputElement

  const createTodo = useAction(createTodoAction)

  const { form, isValid, reset } = createForm({
    schema: CreateTodoSchema,
    onSubmit: async (values) => {
      try {
        await createTodo(values)
        reset()
        contentInput.focus()
      } catch {
        alert("error")
      }
    },
  })

  form
  return (
    <form use:form class="flex items-center">
      <input
        ref={contentInput}
        name="content"
        class="grow p-3 !outline-none"
        placeholder="Type your TODO here"
      />
      <button
        type="submit"
        class="text-sm font-medium text-white bg-sky-600 hover:bg-sky-500 disabled:bg-gray-200 disabled:text-gray-400 transition-colors h-9 inline-flex items-center gap-2 px-4 rounded mr-1.5"
        disabled={!isValid()}
      >
        Add <TablerPlus />
      </button>
    </form>
  )
}

const TodoItem: Component<{ todo: Todo }> = (props) => {
  const toggleCompleted = useAction(toggleCompletedAction)
  const deleteTodo = useAction(deleteTodoAction)

  return (
    <li class="flex gap-3">
      <input
        type="checkbox"
        checked={props.todo.completed}
        onClick={async (e) => {
          e.preventDefault()
          await toggleCompleted({ id: props.todo.id })
        }}
      />
      <span class="grow" classList={{ "line-through opacity-50": props.todo.completed }}>
        {props.todo.content}
      </span>
      <button
        class="h-6 w-6 inline-flex rounded-full hover:bg-black/10 transition-colors"
        onClick={async () => {
          await deleteTodo({ id: props.todo.id })
        }}
      >
        <TablerX class="text-xs m-auto" />
      </button>
    </li>
  )
}

export const route = {
  load: () => getTodos(),
} satisfies RouteDefinition

const TodosPage = () => {
  const todos = createAsync(() => getTodos())

  return (
    <div class="flex flex-col items-center text-center py-16">
      <AppTitle>TODOs</AppTitle>
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase mb-16">TODOs</h1>
      <div class="w-full max-w-md flex flex-col text-left rounded overflow-hidden border border-black/10 divide-y divide-black/10">
        <AddTodoForm />
        {todos()?.length ?? 0 > 0 ? (
          <ul class="flex flex-col gap-2 p-3">
            <For each={todos()}>{(todo) => <TodoItem todo={todo} />}</For>
          </ul>
        ) : (
          <p class="opacity-70 p-3">Use the form above to add a new TODO.</p>
        )}
      </div>
    </div>
  )
}

export default TodosPage
