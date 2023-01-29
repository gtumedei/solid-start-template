import { For } from "solid-js"
import { A, useRouteData } from "solid-start"
import { createServerAction$, createServerData$ } from "solid-start/server"
import { css } from "vite-plugin-inline-css-modules"
import { z } from "zod"
import AppTitle from "~/components/app-title"
import { MainLayout } from "~/layouts/main-layout"
import { createForm } from "~/lib/form"
import prisma from "~/lib/prisma"

const PostFormSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1)
})
type PostForm = z.infer<typeof PostFormSchema>

const NewPostForm = () => {
  const [creatingPost, createPost] = createServerAction$(async (postForm: PostForm) => {
    console.log("createPost")
    const parsedPostForm = PostFormSchema.safeParse(postForm)
    if (!parsedPostForm.success) {
      // TODO: parse Zod errors
      throw new Response(null, { status: 404, statusText: "Bad request" })
    }
    await prisma.post.create({
      data: {
        ...parsedPostForm.data,
        userId: 1
      }
    })
    return { message: "Post successfully created" }
  })

  const { form, isValid, isSubmitting, reset } = createForm({
    schema: PostFormSchema,
    onSubmit: async (values) => {
      await createPost(values)
      if (creatingPost.error) alert(creatingPost.error)
      else reset()
    }
  })

  form
  return (
    <form use:form class="flex flex-col gap-3">
      <input class={style.input} type="text" name="title" placeholder="Title" />
      <textarea class={style.input} name="content" placeholder="Content" />
      <button type="submit" class="btn mx-auto" disabled={!isValid() || isSubmitting()}>Publish</button>
    </form>
  )
}

const style = css`
  .input {
    @apply rounded-lg px-3 py-2 border border-gray-300 focus:border-gray-400 outline-none;
  }
`

export const routeData = () => createServerData$(
  async () => {
    console.log("getPosts")
    const posts = await prisma.post.findMany()
    return posts
  },
  { key: "posts" }
)

const PostsPage = () => {
  const posts = useRouteData<typeof routeData>()

  return (
    <MainLayout>
      <main>
        <AppTitle>Posts</AppTitle>

        <h1 class="text-6xl text-sky-600 font-thin uppercase my-16">Posts</h1>
        <NewPostForm />
        <div class="max-w-3xl flex flex-col gap-6 mt-16">
          {posts()?.length ?? 0 > 0
            ? <For each={posts()}>{(post) =>
                <A href={`/posts/${post.id}`} class="border border-gray-200 rounded-lg text-left p-4">
                  <h2 class="text-xl text-sky-600 font-bold mb-2">{post.title}</h2>
                  <p>{post.content}</p>
                </A>
              }</For>
            : <p class="text-gray-500">There are no posts to show.</p>
          }
        </div>
      </main>
    </MainLayout>
  )
}

export default PostsPage
