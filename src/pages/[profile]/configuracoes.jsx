import Image from "next/image"

import { useState } from "react"

import Input from "components/Input"
import { Navbar } from "components/Navbar"

import styles from "styles/Configuracoes.module.css"

import EyeIcon from "../../../icons/EyeIcon"
import EyelconClosed from "../../../icons/EyelconClosed"

export default function Configuracoes() {
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
    <>
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
        <div className={styles.settings}>
          <h3>Configurar perfil</h3>

          <Input id={"nickname"} label={"Nickname"} type={"text"} />
          <Input id={"name"} label={"Nome"} type={"text"} />
          <Input id={"lastname"} label={"Sobrenome"} type={"text"} />
          <Input id={"birthday"} label={"Data de nascimento"} type={"date"} />
          <Input id={"instagram"} label={"Instagram"} type={"text"} />
          <Input id={"tiktok"} label={"Tiktok"} type={"text"} />
          <Input id={"twitter"} label={"Twitter"} type={"text"} />
          <Input id={"bio"} label={"Biografia"} type={"text"} />
        </div>
        <div className={styles.settings}>
          <h3>Configuração de segurança</h3>

          <Input id={"emailAtual"} label={"Email atual"} type={"email"} />
          <Input id={"novoEmail"} label={"Novo email"} type={"email"} />

          <div className={styles.inputPassword}>
            <Input
              id={"password"}
              label={"Senha Atual"}
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
              label={"Nova senha"}
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
        </div>
        <button className={styles.button}>Salvar</button>
      </div>
    </>
  )
}
