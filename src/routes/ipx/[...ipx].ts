import { APIEvent } from "@solidjs/start/server"
import { toWebHandler } from "h3"
import { createIPX, createIPXH3App, ipxHttpStorage } from "ipx"

const ipx = createIPX({
  storage: ipxHttpStorage({ domains: ["www.solidjs.com"] }),
})

const handler = toWebHandler(createIPXH3App(ipx))

export const GET = (e: APIEvent) => {
  const parts = e.request.url.split(e.request.headers.get("host") + "/ipx")
  return handler(new Request(parts[0]! + e.request.headers.get("host") + parts[1]))
}
