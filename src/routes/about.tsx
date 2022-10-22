import { A } from "solid-start"
import AppTitle from "~/components/app-title"
import Counter from "~/components/counter"

const AboutPage = () => {
  return (
    <>
      <AppTitle>About</AppTitle>

      <main class="text-center mx-auto text-gray-700 p-4">
        <h1 class="text-6xl text-sky-700 font-thin uppercase my-16">
          About Page
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
          <A href="/" class="text-sky-600 hover:underline">Home</A>
          {" - "}
          <span>About Page</span>
        </p>
      </main>
    </>
  )
}

export default AboutPage
