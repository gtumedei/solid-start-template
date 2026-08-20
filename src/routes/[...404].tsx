import { httpStatus } from "@solidjs/web"
import AppTitle from "~/components/app-title"

const NotFoundPage = () => {
  httpStatus(404)

  return (
    <div class="flex flex-col items-center text-center py-16">
      <AppTitle>Page not found</AppTitle>
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase mb-16">Not Found</h1>
      <p class="mt-8">
        Visit{" "}
        <a href="https://solidjs.com" target="_blank" class="text-sky-600 hover:underline">
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
    </div>
  )
}

export default NotFoundPage
