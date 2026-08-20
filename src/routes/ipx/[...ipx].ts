import { APIEvent } from "filesystem-routing/api"
import { createIPX, createIPXFetchHandler, ipxHttpStorage } from "ipx"

const ipx = createIPX({
  storage: ipxHttpStorage({ domains: ["www.solidjs.com"] }),
})

const handler = createIPXFetchHandler(ipx)

export const GET = (e: APIEvent) => {
  const parts = e.request.url.split(e.request.headers.get("host") + "/ipx")
  return handler(new Request(parts[0]! + e.request.headers.get("host") + parts[1]))
}
