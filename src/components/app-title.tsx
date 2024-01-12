import { Title } from "@solidjs/meta"
import { ParentComponent } from "solid-js"

const AppTitle: ParentComponent = (props) => {
  return (
    <Title>
      {props.children ? `${props.children} • solid-start-template` : "solid-start-template"}
    </Title>
  )
}

export default AppTitle
