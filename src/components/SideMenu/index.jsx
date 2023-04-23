import S from "./SideMenu.module.css"

export default function SideMenu() {
  return (
    <div className={S.sidemenu}>
      <nav className={S.navigation}>
        <h2>Configurações</h2>
        <h2>Sobre</h2>
        <h2>Sair</h2>
      </nav>
    </div>
  )
}
