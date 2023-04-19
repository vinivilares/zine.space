import Image from "next/image"

import Input from "components/Input"
import { Navbar } from "components/Navbar"

import styles from "styles/Configuracoes.module.css"

export default function Configuracoes() {
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

          <button>Alterar imagem</button>
        </div>
        <div className={styles.settings}>
          <h3>Configurar perfil</h3>

          <Input id={"nickname"} label={"Nickname"} type={"text"} />
          <Input id={"name"} label={"Nome"} type={"text"} />
          <Input id={"lastname"} label={"Sobrenome"} type={"text"} />
          <Input id={"birthday"} label={"Data de nascimento"} type={"text"} />
          <Input id={"bio"} label={"Biografia"} type={"text"} />
          <Input id={"instagram"} label={"Instagram link"} type={"url"} />
          <Input id={"twitter"} label={"Twitter link"} type={"url"} />
        </div>
        <div className={styles.settings}>
          <h3>Configuração de segurança</h3>

          <Input id={"novoEmail"} label={"Novo email"} type={"text"} />
          <Input id={"senha"} label={"Senha"} type={"password"} />
          <Input id={"novaSenha"} label={"Nova senha"} type={"password"} />
        </div>
        <div className={styles.button}>
          <button>Salvar</button>
        </div>
      </div>
    </>
  )
}
