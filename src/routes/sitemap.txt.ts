const routes = [
  "http://localhost:3000",
  "http://localhost:3000/about"
]

export const GET = () => {
  return new Response(routes.join("\n"))
}
