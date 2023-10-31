import Link from "next/link"
import { useRouter } from "next/router"

import S from "./settingsMenu.module.css"

import { auth } from "../../../firebase"
import ArrowBack from "../../../icons/ArrowBack"

import { signOut } from "firebase/auth"

export default function SettingsMenu({ id, onClick }) {
  const router = useRouter()

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/")
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message)
      })
  }

  return (
    <nav id={id} className={S.menu}>
      <ul>
        <li>
          <Link href={"#"}>
            <h2>Ver perfil</h2>
          </Link>
        </li>
        <li>
          <Link href={"/perfil/configuracoes"}>
            <h2>Configurações</h2>
          </Link>
        </li>
        <li>
          <Link href={"/sobre"}>
            <h2>Sobre</h2>
          </Link>
        </li>
        <li onClick={handleSignOut}>
          <h2>Sair</h2>
        </li>

        <li className={S.closeIcon} onClick={onClick}>
          <ArrowBack />
        </li>
      </ul>
    </nav>
  )
}
