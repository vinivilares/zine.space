import S from "./input.module.css"

export default function Input({ type, label, id, onChange, name }) {
  return (
    <div className={S.container}>
      <input
        className={S.input}
        type={type}
        id={id}
        required
        onChange={onChange}
        autoComplete={"off"}
        name={name}
      />
      <label className={S.label}>{label}</label>
    </div>
  )
}
