import { For } from "solid-js"
import { useRouteData } from "solid-start"
import { createServerData$ } from "solid-start/server"
import AppTitle from "~/components/app-title"

export const routeData = () => createServerData$(async () => {
  await new Promise(r => setTimeout(r, 1000))
  const posts = [
    { title: "First post", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, voluptate!" },
    { title: "Second post", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, voluptate!" }
  ]
  console.log(posts)
  return posts
})

const PostsPage = () => {
  const posts = useRouteData<typeof routeData>()

  return (
    <>
      <AppTitle>Posts</AppTitle>

      <main class="text-center mx-auto text-gray-700 p-4">
        <h1 class="text-6xl text-sky-700 font-thin uppercase my-16">
          Posts
        </h1>
        <div class="max-w-3xl flex flex-col gap-6 m-auto">
          <For each={posts()}>{(post) =>
            <div class="border border-gray-200 rounded-lg text-left p-4">
              <h2 class="text-xl text-sky-700 uppercase mb-2">{post.title}</h2>
              <p>{post.body}</p>
            </div>
          }</For>
        </div>
      </main>
    </>
  )
}

export default PostsPage
