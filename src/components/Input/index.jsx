import S from "./input.module.css"

export default function Input({ type, id, onChange, name, placeholder }) {
  return (
    <input
      className={S.input}
      type={type}
      id={id}
      required
      onChange={onChange}
      autoComplete={"off"}
      name={name}
      placeholder={placeholder}
    />
  )
}
