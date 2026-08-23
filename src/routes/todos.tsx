import {
  query,
  revalidate,
  RouteDefinition,
  action as routerAction,
  useAction,
} from "@solidjs/router"
import { eq } from "drizzle-orm"
import { action, Component, createOptimisticStore, flush, For } from "solid-js"
import { z } from "zod"
import AppTitle from "~/components/app-title"
import { create } from "~/lib/context"
import { db } from "~/lib/db"
import { Todo, Todos } from "~/lib/db/schema"
import { createForm } from "~/lib/form"
import { validated } from "~/lib/validation"
import TablerPlus from "~icons/tabler/plus"
import TablerX from "~icons/tabler/x"

// Add an artificial delay to server operations to showcase pending state and optimistic updates
const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms))

const getTodos = query(async () => {
  "use server"
  console.log("getTodos")
  await delay()
  const todos = await db.select().from(Todos)
  return todos
}, "todos")

const CreateTodoSchema = z.object({
  content: z.string().min(1),
})

const createTodoAction = routerAction(async (rawPayload: z.infer<typeof CreateTodoSchema>) => {
  "use server"
  const payload = validated(rawPayload, CreateTodoSchema)
  console.log("createTodo", payload)
  await delay()
  await db.insert(Todos).values(payload)
  return revalidate(getTodos.key)
})

const TodoIdSchema = z.object({ id: z.number() })

const toggleCompletedAction = routerAction(async (rawPayload: z.infer<typeof TodoIdSchema>) => {
  "use server"
  const payload = validated(rawPayload, TodoIdSchema)
  console.log("toggleCompleted", payload)
  await delay()
  const [todo] = await db.select().from(Todos).where(eq(Todos.id, payload.id))
  if (!todo) throw new Error("TODO not found")
  await db.update(Todos).set({ completed: !todo.completed }).where(eq(Todos.id, payload.id))
  return revalidate(getTodos.key)
})

const deleteTodoAction = routerAction(async (rawPayload: z.infer<typeof TodoIdSchema>) => {
  "use server"
  const payload = validated(rawPayload, TodoIdSchema)
  console.log("deleteTodo", payload)
  await delay()
  await db.delete(Todos).where(eq(Todos.id, payload.id))
  return revalidate(getTodos.key)
})

type OptimisticTodo = Todo & {
  creating?: true
  updating?: true
  deleting?: true
}

const createTodosCtx = () => {
  const [todos, setTodos] = createOptimisticStore<OptimisticTodo[]>(() => getTodos(), [])

  const createTodo = useAction(createTodoAction)
  const createTodoOptimistic: typeof createTodo = action(function* (params) {
    setTodos((v) => {
      v.push({ id: Math.random(), content: params.content, completed: false, creating: true })
    })
    yield createTodo(params)
  })

  const toggleCompleted = useAction(toggleCompletedAction)
  const toggleCompletedOptimistic: typeof toggleCompleted = action(function* (params) {
    setTodos((v) =>
      v.map((todo) =>
        todo.id == params.id ? { ...todo, completed: !todo.completed, updating: true } : todo,
      ),
    )
    yield toggleCompleted(params)
  })

  const deleteTodo = useAction(deleteTodoAction)
  const deleteTodoOptimistic: typeof deleteTodo = action(function* (params) {
    setTodos((v) => v.map((todo) => (todo.id == params.id ? { ...todo, deleting: true } : todo)))
    yield deleteTodo(params)
  })

  return {
    todos,
    createTodo: createTodoOptimistic,
    toggleCompleted: toggleCompletedOptimistic,
    deleteTodo: deleteTodoOptimistic,
  }
}
const [TodosProvider, useTodos] = create(createTodosCtx)

const AddTodoForm = () => {
  let contentInput!: HTMLInputElement

  const { createTodo } = useTodos()

  const { fields, setFields, isValid, handleSubmit, reset } = createForm({
    schema: CreateTodoSchema,
    initialValues: { content: "" },
    onSubmit: async (values) => {
      try {
        reset()
        flush()
        await createTodo(values)
        contentInput.focus()
      } catch (e) {
        setFields(() => values)
        console.error(e)
        alert("error")
      }
    },
  })

  return (
    <form class="flex items-center" onSubmit={handleSubmit}>
      <input
        ref={contentInput}
        value={fields.content}
        onInput={(e) =>
          setFields((fields) => {
            fields.content = e.target.value
          })
        }
        class="grow p-3 outline-none!"
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

const TodoItem: Component<{ todo: OptimisticTodo }> = (props) => {
  const { toggleCompleted, deleteTodo } = useTodos()

  return (
    <li class={["flex gap-3", (props.todo.creating || props.todo.deleting) && "opacity-50"]}>
      <input
        type="checkbox"
        checked={props.todo.completed}
        onClick={async (e) => {
          e.preventDefault()
          await toggleCompleted({ id: props.todo.id })
        }}
      />
      <span class={["grow", props.todo.completed && "line-through"]}>{props.todo.content}</span>
      <button
        class="h-6 w-6 inline-flex rounded-full hover:bg-black/10 disabled:opacity-50 transition-colors"
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
  preload: () => getTodos(),
} satisfies RouteDefinition

const TodosPage = () => {
  const todosCtx = createTodosCtx()
  const { todos } = todosCtx

  return (
    <TodosProvider value={todosCtx}>
      <div class="flex flex-col items-center text-center py-16">
        <AppTitle>TODOs</AppTitle>
        <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase mb-16">TODOs</h1>
        <div class="w-full max-w-md flex flex-col text-left rounded overflow-hidden border border-black/10 divide-y divide-black/10">
          <AddTodoForm />
          {(todos.length ?? 0 > 0) ? (
            <ul class="flex flex-col gap-2 p-3">
              <For each={todos}>{(todo) => <TodoItem todo={todo} />}</For>
            </ul>
          ) : (
            <p class="opacity-70 p-3">Use the form above to add a new TODO.</p>
          )}
        </div>
      </div>
    </TodosProvider>
  )
}

export default TodosPage
