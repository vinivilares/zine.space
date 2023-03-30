import { useState } from "react"

import Input from "components/Input"

import styles from "../styles/Auth.module.css"

import EyeIcon from "../../icons/Eyelcon"
import EyelconClosed from "../../icons/EyelconClosed"

export default function Login() {
  const [containerLogin, setContainerLogin] = useState(true)

  const [visiblePassword, setVisiblePassword] = useState(false)

  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(false)

  function showPassword(idPassword) {
    idPassword = document.getElementById(`${idPassword}`)

    if (idPassword.type == "password" && idPassword.name == "password") {
      idPassword.type = "text"
      setVisiblePassword(true)
    } else if (idPassword.type == "text" && idPassword.name == "password") {
      idPassword.type = "password"
      setVisiblePassword(false)
    }

    if (idPassword.type == "password" && idPassword.name == "repeatPassword") {
      idPassword.type = "text"
      setVisibleRepeatPassword(true)
    } else if (
      idPassword.type == "text" &&
      idPassword.name == "repeatPassword"
    ) {
      idPassword.type = "password"
      setVisibleRepeatPassword(false)
    }
  }
  return (
    <div className={styles.container}>
      <h1>Zine</h1>
      {containerLogin && (
        <div className={styles.login}>
          <div>
            <Input id={"email"} label={"Email"} type="email" />
            <div className={styles.inputPassword}>
              <Input
                id={"password"}
                label={"Password"}
                type="password"
                name="password"
              />
              <button
                className={styles.showPasswordIcon}
                onClick={() => {
                  showPassword("password")
                }}
              >
                {!visiblePassword && <EyeIcon />}
                {visiblePassword && <EyelconClosed />}
              </button>
            </div>
            <button className={styles.button}>Login</button>
          </div>

          <p className={styles.p}>Forgot password?</p>

          <div className={styles.loginWith}>
            <button className={styles.button}>Login with Google</button>
            <button className={styles.button}>Login with Facebook</button>
            <button className={styles.button}>Login with Apple</button>
          </div>
          <p className={styles.p}>
            Don&#x27;t have an account.{" "}
            <span
              className={styles.span}
              onClick={() => {
                setContainerLogin(false)
                setVisiblePassword(false)
              }}
            >
              Sign up
            </span>
          </p>
        </div>
      )}

      {!containerLogin && (
        <div className={styles.createAccount}>
          <Input id={"nickname"} label={"Nickname"} type="text" />
          <Input id={"name"} label={"Name"} type="text" />

          <Input id={"lastname"} label={"Lastname"} type="text" />

          <Input id={"birthday"} type="date" />

          <Input id={"email"} label={"Email"} type="email" />

          <div className={styles.inputPassword}>
            <Input
              id={"password"}
              label={"Password"}
              type="password"
              name="password"
            />
            <button
              className={styles.showPasswordIcon}
              onClick={() => {
                showPassword("password")
              }}
            >
              {!visiblePassword && <EyeIcon />}
              {visiblePassword && <EyelconClosed />}
            </button>
          </div>

          <div className={styles.inputPassword}>
            <Input
              id={"repeatPassword"}
              label={"Repeat password"}
              type="password"
              name="repeatPassword"
            />
            <button
              className={styles.showPasswordIcon}
              onClick={() => {
                showPassword("repeatPassword")
              }}
            >
              {!visibleRepeatPassword && <EyeIcon />}
              {visibleRepeatPassword && <EyelconClosed />}
            </button>
          </div>

          <button className={styles.button}>Create account</button>
          <p className={styles.p}>
            Already have an account.{" "}
            <span
              className={styles.span}
              onClick={() => {
                setContainerLogin(true)
                setVisiblePassword(false)
                setVisibleRepeatPassword(false)
              }}
            >
              Login
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
