import { getSession, signOut } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"

import { useState } from "react"

import Input from "components/Input"
import { Navbar } from "components/Navbar"

import styles from "styles/Configuracoes.module.css"

import EyeIcon from "../../../icons/EyeIcon"
import EyelconClosed from "../../../icons/EyelconClosed"
import { buscarUser } from "../../../lib/prisma"

export default function Configuracoes({ user }) {
  const [usuario, setUsuario] = useState({
    nickname: user.nickname,
    nome: user.nome,
    dt_nascimento: new Date(user.dt_nascimento).toISOString().split("T")[0],
    instagram: user.instagram,
    tiktok: user.tiktok,
    twitter: user.twitter,
    biografia: user.biografia,
    id: user.id,
    email: user.email,
    novoEmail: user.novoEmail,
    senha: user.senha,
    novaSenha: user.novaSenha,
    repetirNovaSenha: user.repetirNovaSenha
  })

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
  async function updateHandle(event) {
    event.preventDefault()

    try {
      const response = await fetch(`/api/${user.nickname}/configuracoes`, {
        method: "PUT",
        body: JSON.stringify({
          usuario
        }),
        headers: { "Content-Type": "application/json" }
      })
      const data = await response.json()
      if (usuario.novoEmail) {
        await signOut()
      }
      return data
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <>
      <Head>
        <title>Zine - Configurações</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.image}>
          <Image
            src="/profilepic.jpg"
            width={100}
            height="100"
            alt="Foto de perfil"
          />

          <button className={styles.button}>Alterar imagem</button>
        </div>
        <form className={styles.settings} onSubmit={updateHandle}>
          <div className={styles.settings}>
            <h3>Configurar perfil</h3>

            <Input
              id={"nickname"}
              placeholder={"Nickname"}
              type={"text"}
              value={usuario.nickname}
              onChange={({ target }) =>
                setUsuario({ ...usuario, nickname: target.value })
              }
            />
            <Input
              id={"name"}
              placeholder={"Nome"}
              type={"text"}
              value={usuario.nome}
              onChange={({ target }) =>
                setUsuario({ ...usuario, nome: target.value })
              }
            />

            <Input
              id={"birthday"}
              type={"date"}
              value={usuario.dt_nascimento}
              onChange={({ target }) =>
                setUsuario({ ...usuario, dt_nascimento: target.value })
              }
            />

            <Input
              id={"instagram"}
              placeholder={"Instagram"}
              type={"text"}
              value={usuario.instagram}
              onChange={({ target }) =>
                setUsuario({ ...usuario, instagram: target.value })
              }
            />
            <Input
              id={"tiktok"}
              placeholder={"Tiktok"}
              type={"text"}
              value={usuario.tiktok}
              onChange={({ target }) =>
                setUsuario({ ...usuario, tiktok: target.value })
              }
            />
            <Input
              id={"twitter"}
              placeholder={"Twitter"}
              type={"text"}
              value={usuario.twitter}
              onChange={({ target }) =>
                setUsuario({ ...usuario, twitter: target.value })
              }
            />
            <Input
              id={"bio"}
              placeholder={"Biografia"}
              type={"text"}
              value={usuario.biografia}
              onChange={({ target }) =>
                setUsuario({ ...usuario, biografia: target.value })
              }
            />
          </div>
          <div className={styles.settings}>
            <h3>Configuração de segurança</h3>

            <Input
              id={"emailAtual"}
              placeholder={"Email atual"}
              type={"email"}
              value={usuario.email}
              onChange={({ target }) =>
                setUsuario({ ...usuario, email: target.value })
              }
            />
            <Input
              id={"novoEmail"}
              placeholder={"Novo email"}
              type={"email"}
              onChange={({ target }) =>
                setUsuario({ ...usuario, novoEmail: target.value })
              }
            />

            <div className={styles.inputPassword}>
              <Input
                id={"password"}
                placeholder={"Senha Atual"}
                type="password"
                name="password"
                onChange={({ target }) =>
                  setUsuario({ ...usuario, senha: target.value })
                }
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
                placeholder={"Nova senha"}
                type="password"
                name="repeatPassword"
                onChange={({ target }) =>
                  setUsuario({ ...usuario, novaSenha: target.value })
                }
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
            <div className={styles.inputPassword}>
              <Input
                id={"repeatPassword"}
                placeholder={"Repetir nova senha"}
                type="password"
                name="repeatPassword"
                onChange={({ target }) =>
                  setUsuario({ ...usuario, repetirNovaSenha: target.value })
                }
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
          </div>
          <input className={styles.button} type="submit" value={"Salvar"} />
        </form>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const userSession = await getSession(context)

  if (!userSession) {
    return {
      redirect: { destination: "/" }
    }
  } else {
    const user = await buscarUser(userSession.user.email)
    if (user.nickname !== context.query.profile) {
      return {
        redirect: { destination: "/" }
      }
    }

    return { props: { user: JSON.parse(JSON.stringify(user)) } }
  }
}
