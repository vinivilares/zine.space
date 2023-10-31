import { useRouter } from "next/router"

import { useEffect, useState } from "react"

import Input from "components/Input"

import styles from "../styles/Home.module.css"

import { auth } from "../../firebase"
import EyeIcon from "../../icons/EyeIcon"
import EyelconClosed from "../../icons/EyelconClosed"

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"

export default function Login() {
  const [containerLogin, setContainerLogin] = useState(true)

  const [visiblePassword, setVisiblePassword] = useState(false)

  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(false)

  const [login, setLogin] = useState({ email: undefined, password: undefined })
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState({})
  const router = useRouter()
  // Verificar se esta logado
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        router.push("/feed")
      }
    })
  }, [router])
  //função que faz login
  async function handleLogin() {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        login.email,
        login.password
      )
      console.log(user)
    } catch (error) {
      alert(error.message)
    }
  }

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
      <div className={styles.info}>
        <h1>Zine</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque
          tempora odio corporis ratione mollitia repellat voluptate culpa vel
          unde qui, incidunt reprehenderit nulla assumenda enim, excepturi
          temporibus, dolor ut deleniti!
        </p>
      </div>

      {containerLogin && (
        <div className={styles.login}>
          <div>
            <Input
              id={"email"}
              placeholder={"Email"}
              type="text"
              onChange={(event) => {
                setLogin({ ...login, email: event.target.value })
              }}
            />
            <div className={styles.inputPassword}>
              <Input
                id={"password"}
                placeholder={"Password"}
                type="password"
                name="password"
                onChange={(event) => {
                  setLogin({ ...login, password: event.target.value })
                }}
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
            <button className={styles.button} onClick={handleLogin}>
              Login
            </button>
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
          <Input id={"nickname"} placeholder={"Nickname"} type="text" />
          <Input id={"name"} placeholder={"Name"} type="text" />

          <Input id={"lastname"} placeholder={"Lastname"} type="text" />

          <Input id={"email"} placeholder={"Email"} type="text" />

          <div className={styles.inputPassword}>
            <Input
              id={"password"}
              placeholder={"Password"}
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
              placeholder={"Repeat password"}
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
