# solid-start-template

## Features

- Inline CSS modules support
- Use icons from any set with unplugin-icons
- Typesafe environment variables with Zod
- Progress bar for page loading with nprogress
- Handle forms with Felte and Zod
- Optimize images with IPX

## TODO

- Use router actions in the todos page on top of `"use server"`
  - Move revalidation to the server-side
  - Right now the revalidation part does not seem to work: the route data function is called on the server, but the client does not get updated
