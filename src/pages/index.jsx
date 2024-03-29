import { signIn, getSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"

import { useRef, useState } from "react"

import Input from "components/Input"

import styles from "../styles/Home.module.css"

import EyeIcon from "../../icons/EyeIcon"
import EyelconClosed from "../../icons/EyelconClosed"
import { buscarUser } from "../../lib/prisma"

export default function Login() {
  const router = useRouter()

  const [containerLogin, setContainerLogin] = useState(true)

  const [visiblePassword, setVisiblePassword] = useState(false)

  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(false)

  const nicknameInputRef = useRef()
  const nomeInputRef = useRef()
  const dataInputRef = useRef()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const repeatPasswordInputRef = useRef()

  async function loginHandler(event) {
    event.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    try {
      // eslint-disable-next-line no-unused-vars
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword
      })
    } catch (error) {
      alert(error.message)
    }

    await router.push("/feed")
  }

  async function submitHandler(event) {
    event.preventDefault()

    const enteredNickname = nicknameInputRef.current.value
    const enteredNome = nomeInputRef.current.value
    const enteredData = dataInputRef.current.value
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    const enteredRepeatPassword = repeatPasswordInputRef.current.value

    try {
      // eslint-disable-next-line no-unused-vars
      const result = await createUser(
        enteredNickname,
        enteredNome,
        enteredData,
        enteredEmail,
        enteredPassword,
        enteredRepeatPassword
      )
    } catch (error) {
      alert(error.message)
    }
    alert("Usuário criado, faça login para acessar")
    setContainerLogin(true)
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
    <>
      <Head>
        <title>Zine - Login</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.info}>
          <h1>Zine</h1>
          <p>
            Zine é uma plataforma onde, você pode compartilhar com seus amigos
            suas atividades sobre seus filmes e series favoritos
          </p>
        </div>

        {containerLogin && (
          <div className={styles.login}>
            <div>
              <Input
                id={"email"}
                placeholder={"Email"}
                type="text"
                ref={emailInputRef}
              />
              <div className={styles.inputPassword}>
                <Input
                  id={"password"}
                  placeholder={"Password"}
                  type="password"
                  name="password"
                  ref={passwordInputRef}
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
              <button className={styles.button} onClick={loginHandler}>
                Login
              </button>
            </div>

            <p className={styles.p}>Esqueceu sua senha ?</p>

            <div className={styles.loginWith}>
              <button
                disabled
                className={styles.button}
                onClick={() => alert("Estamos trabalhando nisso")}
              >
                Login with Google &#40;em breve&#41;
              </button>
              <button
                disabled
                className={styles.button}
                onClick={() => alert("Estamos trabalhando nisso")}
              >
                Login with Facebook &#40;em breve&#41;
              </button>
              <button
                disabled
                className={styles.button}
                onClick={() => alert("Estamos trabalhando nisso")}
              >
                Login with Apple &#40;em breve&#41;
              </button>
            </div>
            <p className={styles.p}>
              Ainda não tem conta ?{" "}
              <span
                className={styles.span}
                onClick={() => {
                  setContainerLogin(false)
                  setVisiblePassword(false)
                }}
              >
                Cadastre-se
              </span>
            </p>
          </div>
        )}

        {!containerLogin && (
          <div className={styles.createAccount}>
            <Input
              id={"nickname"}
              placeholder={"Nickname"}
              type="text"
              ref={nicknameInputRef}
            />

            <Input
              id={"name"}
              placeholder={"Nome"}
              type="text"
              ref={nomeInputRef}
            />

            <Input
              id={"birthday"}
              // placeholder={"Birthday"}
              type="date"
              ref={dataInputRef}
            />

            <Input
              id={"email"}
              placeholder={"Email"}
              type="text"
              ref={emailInputRef}
            />

            <div className={styles.inputPassword}>
              <Input
                id={"password"}
                placeholder={"Senha"}
                type="password"
                name="password"
                ref={passwordInputRef}
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
                placeholder={"Repita sua senha"}
                type="password"
                name="repeatPassword"
                ref={repeatPasswordInputRef}
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

            <button className={styles.button} onClick={submitHandler}>
              Criar conta
            </button>
            <p className={styles.p}>
              Já tem uma conta ?{" "}
              <span
                className={styles.span}
                onClick={() => {
                  setContainerLogin(true)
                  setVisiblePassword(false)
                  setVisibleRepeatPassword(false)
                }}
              >
                Fazer Login
              </span>
            </p>
          </div>
        )}
      </div>
    </>
  )
}

async function createUser(
  nickname,
  nome,
  dt_nascimento,
  email,
  password,
  repeatPassowrd
) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      nickname,
      nome,
      dt_nascimento,
      email,
      password,
      repeatPassowrd
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Algo deu errado!")
  }

  return data
}

export async function getServerSideProps(context) {
  const userSession = await getSession(context)

  if (userSession) {
    // eslint-disable-next-line no-unused-vars
    const user = await buscarUser(userSession.user.email)
    return {
      redirect: {
        destination: "/feed"
      }
    }
  }

  return {
    props: {
      userSession
    }
  }
}
