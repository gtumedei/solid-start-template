import { RouteDataArgs, useRouteData } from "solid-start"
import { createServerData$, redirect } from "solid-start/server"
import AppTitle from "~/components/app-title"
import { MainLayout } from "~/layouts/main-layout"
import prisma from "~/lib/prisma"

export const routeData = ({ params }: RouteDataArgs) => createServerData$(
  async ([, postId]) => {
    console.log("getPost")
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId)
      }
    })
    if (!post) throw redirect("/404", { status: 404 })
    return post
  },
  { key: () => ["posts", params.postId] }
)

const PostPage = () => {
  const post = useRouteData<typeof routeData>()

  return (
    <MainLayout>
      {post() &&
        <main>
          <AppTitle>{post()?.title}</AppTitle>

          <h1 class="text-6xl text-sky-600 font-thin uppercase my-16">{post()?.title}</h1>
          <p>{post()?.content}</p>
        </main>
      }
    </MainLayout>
  )
}

export default PostPage
