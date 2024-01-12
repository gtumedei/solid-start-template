// @refresh reload
import { MetaProvider } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start"
import { Suspense } from "solid-js"
import Footer from "~/components/footer"
import Header from "~/components/header"
import { NProgress } from "~/components/nprogress"
import env from "~/lib/env"

import "~/app.css"

const App = () => {
  // Should print all env variables on the server, but only the public ones on the client
  console.log(env)

  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <NProgress />
          <Header />
          <main class="grow flex flex-col">
            <Suspense>{props.children}</Suspense>
          </main>
          <Footer />
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}

export default App
