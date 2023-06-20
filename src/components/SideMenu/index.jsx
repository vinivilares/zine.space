import Link from "next/link"

import S from "./SideMenu.module.css"

export default function SideMenu() {
  return (
    <div className={S.sidemenu}>
      <nav className={S.navigation}>
        <Link href={"/perfil/configuracoes"}>
          <h2>Configurações</h2>
        </Link>
        <Link href={"/sobre"}>
          <h2>Sobre</h2>
        </Link>
        <h2>Sair</h2>
      </nav>
    </div>
  )
}
