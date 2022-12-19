import { A } from "solid-start"
import AppTitle from "~/components/app-title"
import { EmptyLayout } from "~/layouts/empty-layout"

const NotFoundPage = () => {
  return (
    <EmptyLayout>
      <main class="text-center mx-auto text-gray-700 p-4">
        <AppTitle>Page Not Found</AppTitle>

        <h1 class="text-6xl text-sky-600 font-thin uppercase my-16">Not Found</h1>
        <p class="mt-8">
          Visit{" "}
          <a
            href="https://solidjs.com"
            target="_blank"
            class="text-sky-600 hover:underline"
          >solidjs.com</a>
          {" "}to learn how to build Solid apps.
        </p>
        <p class="my-4">
          <A href="/" class="text-sky-600 hover:underline">Home</A>
          {" - "}
          <A href="/about" class="text-sky-600 hover:underline">About Page</A>
        </p>
      </main>
    </EmptyLayout>
  )
}

export default NotFoundPage
