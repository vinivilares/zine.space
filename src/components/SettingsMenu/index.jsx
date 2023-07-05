import Link from "next/link"

import S from "./SideMenu.module.css"

export default function SettingsMenu() {
  return (
    <div className={S.settingsMenu}>
      <nav>
        <ul className={S.navigation}>
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
          <li>
            <h2>Sair</h2>
          </li>
        </ul>
      </nav>
    </div>
  )
}
