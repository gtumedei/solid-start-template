import { ComponentProps } from "@solidjs/web"
import { Component, omit } from "solid-js"

const Img: Component<
  ComponentProps<"img"> & {
    format?: "jpg" | "jpeg" | "png" | "webp" | "avif" | "gif" | "heif" | "tiff"
    quality?: number
  }
> = (props) => {
  const rest = omit(props, "src", "alt", "height", "width", "format", "quality")

  const ipxOptions = () => {
    const options: string[] = []

    if (props.height && props.width) options.push(`s_${props.width}x${props.height}`)
    else if (props.height) options.push(`h_${props.height}`)
    else if (props.width) options.push(`w_${props.width}`)
    if (props.format) options.push(`f_${props.format}`)
    if (props.quality) options.push(`q_${props.quality}`)

    return options.length == 0 ? "_" : options.join(",")
  }

  return <img src={`/ipx/${ipxOptions()}/${props.src}`} alt={props.alt} {...rest} />
}

export default Img
