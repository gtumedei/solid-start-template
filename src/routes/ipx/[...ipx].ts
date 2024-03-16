import { APIHandler } from "@solidjs/start/server"
import { useBase } from "h3"
import { createIPX, createIPXH3Handler, ipxHttpStorage } from "ipx"

const ipx = createIPX({
  storage: ipxHttpStorage({ domains: ["images.unsplash.com"] }),
})

const ipxHandler = useBase("/ipx", createIPXH3Handler(ipx))

export const GET: APIHandler = (event) => ipxHandler(event.nativeEvent)
