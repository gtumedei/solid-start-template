import { Component, ComponentProps, splitProps } from "solid-js"

const Img: Component<
  ComponentProps<"img"> & {
    format?: "jpg" | "jpeg" | "png" | "webp" | "avif" | "gif" | "heif" | "tiff"
    quality?: number
  }
> = (props) => {
  const [ipx, rest] = splitProps(props, ["src", "alt", "height", "width", "format", "quality"])

  const ipxOptions = () => {
    const options: string[] = []

    if (ipx.height && ipx.width) options.push(`s_${ipx.width}x${ipx.height}`)
    else if (ipx.height) options.push(`h_${ipx.height}`)
    else if (ipx.width) options.push(`w_${ipx.width}`)
    if (ipx.format) options.push(`f_${ipx.format}`)
    if (ipx.quality) options.push(`q_${ipx.quality}`)

    return options.length == 0 ? "_" : options.join(",")
  }

  return <img src={`/ipx/${ipxOptions()}/${ipx.src}`} alt={ipx.alt} {...rest} />
}

export default Img
