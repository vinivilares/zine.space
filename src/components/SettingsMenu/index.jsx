import Link from "next/link"

import S from "./settingsMenu.module.css"

import ArrowBack from "../../../icons/ArrowBack"

export default function SettingsMenu({ id, onClick }) {
  return (
    <nav id={id} className={S.menu}>
      <ul>
        <li>
          <Link href={"/perfil/configuracoes"}>
            <h2>Ver perfil</h2>
          </Link>
        </li>
        <li>
          <Link href={"/perfil/configuracoes"}>
            <h2>Configurações</h2>
          </Link>
        </li>
        <li>
          <Link href={"/perfil/configuracoes"}>
            <h2>Sobre</h2>
          </Link>
        </li>
        <li>
          <Link href={"/perfil/configuracoes"}>
            <h2>Sair</h2>
          </Link>
        </li>

        <li className={S.closeIcon} onClick={onClick}>
          <ArrowBack />
        </li>
      </ul>
    </nav>
  )
}
