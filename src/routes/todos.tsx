import { RouteDefinition, cache, createAsync, revalidate } from "@solidjs/router"
import { Component, For } from "solid-js"
import { z } from "zod"
import AppTitle from "~/components/app-title"
import { createForm } from "~/lib/form"
import TablerPlus from "~icons/tabler/plus"
import TablerX from "~icons/tabler/x"

let todos = [
  {
    id: 0,
    content: "Learn Solid.js",
    completed: true,
  },
  {
    id: 1,
    content: "Finish this template",
    completed: false,
  },
]

type Todo = (typeof todos)[number]

const getTodos = cache(async () => {
  "use server"
  console.log("getTodos")
  return todos
}, "todos")

const createTodo = async (args: { content: string }) => {
  "use server"
  console.log("createTodo")
  todos.push({ id: todos.length, content: args.content, completed: false })
  return { success: true }
}

const toggleCompleted = async (args: { id: number }) => {
  "use server"
  console.log("toggleCompleted")
  const todo = todos.find((t) => t.id == args.id)
  if (!todo) return new Error("TODO not found")
  todo.completed = !todo.completed
  return { success: true }
}

const deleteTodo = async (args: { id: number }) => {
  "use server"
  console.log("deleteTodo")
  todos = todos.filter((t) => t.id != args.id)
  return { success: true }
}

export const route = {
  load: () => getTodos(),
} satisfies RouteDefinition

const AddTodoForm = () => {
  let contentInput!: HTMLInputElement

  const { form, isValid, reset } = createForm({
    schema: z.object({
      content: z.string().min(1),
    }),
    onSubmit: async (values) => {
      try {
        await createTodo(values)
        await revalidate("todos")
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
  const onToggle = async (e: Event) => {
    e.preventDefault()
    await toggleCompleted({ id: props.todo.id })
    await revalidate("todos")
  }

  const onDelete = async () => {
    await deleteTodo({ id: props.todo.id })
    await revalidate("todos")
  }

  return (
    <li class="flex gap-3">
      <input type="checkbox" checked={props.todo.completed} onClick={onToggle} />
      <span class="grow" classList={{ "line-through opacity-50": props.todo.completed }}>
        {props.todo.content}
      </span>
      <button
        class="h-6 w-6 inline-flex rounded-full hover:bg-black/10 transition-colors"
        onClick={onDelete}
      >
        <TablerX class="text-xs m-auto" />
      </button>
    </li>
  )
}

const TodosPage = () => {
  const todos = createAsync(getTodos)

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
