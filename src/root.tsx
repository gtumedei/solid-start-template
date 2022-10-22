// @refresh reload
import { Suspense } from "solid-js"
import { Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts } from "solid-start"
import AppMenu from "~/components/app-menu"
import AppTitle from "~/components/app-title"
import { registerPwa, PwaUpdatePrompt } from "~/lib/pwa"
import "~/style.css"

const Root = () => {
  registerPwa()

  return (
    <Html lang="en">
      <Head>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <AppTitle />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <AppMenu />
            <Routes>
              <FileRoutes />
            </Routes>
            <PwaUpdatePrompt />
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}

export default Root
