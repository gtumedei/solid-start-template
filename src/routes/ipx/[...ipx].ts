import { createIPX, ipxHttpStorage, createIPXH3Handler } from "ipx"

const ipx = createIPX({
  storage: ipxHttpStorage({ domains: ["localhost:3000"] }),
})

export const GET = createIPXH3Handler(ipx)
