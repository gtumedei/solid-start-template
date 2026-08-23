import { Title } from "@solidjs/meta"
import { Errored, Loading } from "solid-js"
import Footer from "~/components/footer"
import Header from "~/components/header"
import { NProgress } from "~/components/nprogress"
import env from "~/lib/env"
import { Router } from "~/router"

import "~/global.css"

export default function App() {
  // Should print all env variables on the server, but only the public ones on the client
  console.log(env)

  return (
    <Router>
      {(props) => (
        <>
          <Title>solid-start-template</Title>
          <Errored fallback={(e) => <pre>{JSON.stringify(e(), null, 2)}</pre>}>
            <Loading fallback={<main>Loading…</main>}>
              <NProgress />
              <Header />
              <main class="grow flex flex-col px-6">{props.children}</main>
              <Footer />
            </Loading>
          </Errored>
        </>
      )}
    </Router>
  )
}
