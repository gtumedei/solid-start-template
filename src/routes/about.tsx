import AppTitle from "~/components/app-title"
import Img from "~/components/img"

const AboutPage = () => {
  return (
    <div class="flex flex-col items-center text-center py-16">
      <AppTitle>About</AppTitle>
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase mb-16">About</h1>
      <Img
        src="https://www.solidjs.com/img/logo/without-wordmark/logo.png"
        alt="SolidJS Logo"
        class="h-32 w-32"
        height={128}
        width={128}
      />
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

export default AboutPage
