import { ParentComponent } from "solid-js"
import { Title } from "solid-start"

const AppTitle: ParentComponent = (props) => {
  return props.children
    ? <Title>{props.children} • solid-start-template</Title>
    : <Title>solid-start-template</Title>
}

export default AppTitle
