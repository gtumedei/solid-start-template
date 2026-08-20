import type { ParentProps } from "solid-js"
import { HydrationScript } from "@solidjs/web"

export default function Document(props: ParentProps) {
  return (
    <html lang="en" class="min-h-full flex text-gray-700">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>solid-start-template</title>
        <HydrationScript />
      </head>
      <body class="grow flex flex-col">{props.children}</body>
    </html>
  )
}
