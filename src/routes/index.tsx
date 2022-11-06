import { A } from "solid-start"
import AppTitle from "~/components/app-title"
import Counter from "~/components/counter"
import { MainLayout } from "~/layouts/MainLayout"

const HomePage = () => {
  return (
    <MainLayout>
      <main>
        <AppTitle>Home</AppTitle>

        <h1 class="text-6xl text-sky-700 font-thin uppercase my-16">
          Hello world!
        </h1>
        <Counter />
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
          <span>Home</span>
          {" - "}
          <A href="/about" class="text-sky-600 hover:underline">About Page</A>
        </p>
      </main>
    </MainLayout>
  )
}

export default HomePage
