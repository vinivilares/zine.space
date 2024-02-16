import { forwardRef } from "react"

import S from "./input.module.css"

// eslint-disable-next-line react/display-name
const Input = forwardRef(
  ({ type, id, name, placeholder, value, onChange }, ref) => {
    return (
      <input
        className={S.input}
        type={type}
        id={id}
        //required
        autoComplete={"off"}
        name={name}
        placeholder={placeholder}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    )
  }
)

export default Input
