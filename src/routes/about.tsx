import AppTitle from "~/components/app-title"

export default function AboutPage() {
  return (
    <div class="flex flex-col items-center text-center py-16">
      <AppTitle>About</AppTitle>
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase mb-16">About</h1>
      <img src="/logo.svg" alt="SolidJS Logo" class="size-32" />
      <p class="mt-16">
        Visit{" "}
        <a href="https://solidjs.com" target="_blank" class="text-sky-600 hover:underline">
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
    </div>
  )
}
