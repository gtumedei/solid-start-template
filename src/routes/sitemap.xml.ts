import { APIHandler } from "filesystem-routing/api"
import { SitemapStream, streamToPromise } from "sitemap"
import { pageRoutes } from "virtual:file-routes"
import env from "~/lib/env"

export const GET: APIHandler = async () => {
  const sitemap = new SitemapStream({ hostname: env.public.PUBLIC_BASE_URL })
  pageRoutes
    // For simplicity, filter out dynamic routes
    // In a real website, this requires some handling (i.e. getStaticPaths) and caching
    .filter((r) => !r.path.includes(":") && !r.path.includes("*"))
    .forEach((r) => sitemap.write({ url: r.path, changefreq: "monthly" }))
  sitemap.end()

  const buffer = await streamToPromise(sitemap)

  return new Response(buffer.toString(), {
    status: 200,
    headers: new Headers({ "Content-Type": "text/xml" }),
  })
}
