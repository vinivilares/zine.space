import { getSession, signOut } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"

import { useState } from "react"

import Dialog from "components/Dialog"
import Input from "components/Input"
import { Navbar } from "components/Navbar"

import styles from "styles/Configuracoes.module.css"

import CloseIcon from "../../../icons/CloseIcon"
import EyeIcon from "../../../icons/EyeIcon"
import EyelconClosed from "../../../icons/EyelconClosed"
import { buscarUser } from "../../../lib/prisma"

export default function Configuracoes({ user }) {
  const router = new useRouter()
  const [usuario, setUsuario] = useState({
    nickname: user.nickname,
    nome: user.nome,
    dt_nascimento: new Date(user.dt_nascimento).toISOString().split("T")[0],
    instagram: (user.instagram = undefined),
    tiktok: (user.tiktok = undefined),
    twitter: (user.twitter = undefined),
    biografia: (user.biografia = undefined),
    id: user.id,
    email: user.email,
    novoEmail: (user.novoEmail = undefined),
    senha: (user.senha = undefined),
    novaSenha: (user.novaSenha = undefined),
    repetirNovaSenha: (user.repetirNovaSenha = undefined)
  })

  const [visiblePassword, setVisiblePassword] = useState(false)

  const [visibleNewPassword, setVisibleNewPassword] = useState(false)
  const [visibleRepeatNewPassword, setVisibleRepeatNewPassword] =
    useState(false)

  function showPassword(idPassword) {
    idPassword = document.getElementById(`${idPassword}`)

    if (idPassword.type == "password" && idPassword.name == "password") {
      idPassword.type = "text"
      setVisiblePassword(true)
    } else if (idPassword.type == "text" && idPassword.name == "password") {
      idPassword.type = "password"
      setVisiblePassword(false)
    }

    if (idPassword.type == "password" && idPassword.name == "newPassword") {
      idPassword.type = "text"
      setVisibleNewPassword(true)
    } else if (idPassword.type == "text" && idPassword.name == "newPassword") {
      idPassword.type = "password"
      setVisibleNewPassword(false)
    }

    if (
      idPassword.type == "password" &&
      idPassword.name == "repeatNewPassword"
    ) {
      idPassword.type = "text"
      setVisibleRepeatNewPassword(true)
    } else if (
      idPassword.type == "text" &&
      idPassword.name == "repeatNewPassword"
    ) {
      idPassword.type = "password"
      setVisibleRepeatNewPassword(false)
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

      if (!response.ok) {
        throw new Error(`Erro na rede! Status: ${response.status}`)
      }

      const data = await response.json()

      if (usuario.novoEmail) {
        await signOut()
      }

      router.push(`/${usuario.nickname}/configuracoes`)

      closeDialog()

      return data
    } catch (error) {
      alert(error.message)
    }
  }

  function showDialog() {
    // eslint-disable-next-line no-undef
    dialog.showModal()
  }

  function closeDialog() {
    // eslint-disable-next-line no-undef
    dialog.close()
  }

  return (
    <>
      <Head>
        <title>Zine - Configurações</title>
      </Head>
      <Dialog id={"dialog"}>
        <div>
          <h3>Ao alterar o email será necessário fazer o login novamente</h3>
          <span onClick={closeDialog}>
            <CloseIcon />
          </span>
        </div>
        <div>
          <button onClick={updateHandle}>Confirmar</button>
          <button onClick={closeDialog}>Cancelar</button>
        </div>
      </Dialog>
      <Navbar nickname={user.nickname} />
      <div className={styles.container}>
        <div className={styles.image}>
          <Image
            src="/profilepic.png"
            width={100}
            height="100"
            alt="Foto de perfil"
            priority
          />

          <button className={styles.button}>Alterar imagem</button>
        </div>
        <div className={styles.settings}>
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
              disabled
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

            {/* Senha atual */}
            <div className={styles.inputPassword}>
              <Input
                id={"password"}
                placeholder={"Senha Atual"}
                type="password"
                name="password"
                value={undefined}
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

            {/* Nova senha */}
            <div className={styles.inputPassword}>
              <Input
                id={"newPassword"}
                placeholder={"Nova senha"}
                type="password"
                name="newPassword"
                onChange={({ target }) =>
                  setUsuario({ ...usuario, novaSenha: target.value })
                }
              />
              <button
                className={styles.showPasswordIcon}
                onClick={() => {
                  showPassword("newPassword")
                }}
              >
                {!visibleNewPassword && <EyeIcon />}
                {visibleNewPassword && <EyelconClosed />}
              </button>
            </div>

            {/* Repetir nova senha */}
            <div className={styles.inputPassword}>
              <Input
                id={"repeatNewPassword"}
                placeholder={"Repetir nova senha"}
                type="password"
                name="repeatNewPassword"
                onChange={({ target }) =>
                  setUsuario({ ...usuario, repetirNovaSenha: target.value })
                }
              />
              <button
                className={styles.showPasswordIcon}
                onClick={() => {
                  showPassword("repeatNewPassword")
                }}
              >
                {!visibleRepeatNewPassword && <EyeIcon />}
                {visibleRepeatNewPassword && <EyelconClosed />}
              </button>
            </div>
          </div>
          <button className={styles.button} onClick={showDialog}>
            Salvar
          </button>
        </div>
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
