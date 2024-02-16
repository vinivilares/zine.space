import { signOut } from "next-auth/react"
import Link from "next/link"

import S from "./settingsMenu.module.css"

import ArrowBack from "../../../icons/ArrowBack"

export default function SettingsMenu({ id, onClick, nickname }) {
  return (
    <nav id={id} className={S.menu}>
      <ul>
        {nickname && (
          <>
            <li>
              <Link href={`/${nickname}`}>
                <h2>Ver perfil</h2>
              </Link>
            </li>
            <li>
              <Link href={`/${nickname}/configuracoes`}>
                <h2>Configurações</h2>
              </Link>
            </li>
          </>
        )}

        {!nickname && (
          <Link href={`/`}>
            <h2>Fazer login</h2>
          </Link>
        )}

        <li>
          <Link href={"/sobre"}>
            <h2>Sobre</h2>
          </Link>
        </li>

        {nickname && (
          <li onClick={signOut}>
            <h2>Sair</h2>
          </li>
        )}

        <li className={S.closeIcon} onClick={onClick}>
          <ArrowBack />
        </li>
      </ul>
    </nav>
  )
}
