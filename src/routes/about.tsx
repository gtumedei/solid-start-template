import AppTitle from "~/components/app-title"
import { MainLayout } from "~/layouts/main-layout"

const AboutPage = () => {
  return (
    <MainLayout>
      <main>
        <AppTitle>About</AppTitle>

        <h1 class="text-6xl text-sky-700 font-thin uppercase my-16">
          About Page
        </h1>
      </main>
    </MainLayout>
  )
}

export default AboutPage
