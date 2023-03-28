import Image from "next/image"

import S from "./Navbar.module.css"

import BellIcon from "../../../Icons/BellIcon"
import HamburgerIcon from "../../../Icons/HamburgerIcon"
import SearchIcon from "../../../Icons/SearchIcon"

export function Navbar() {
  return (
    <nav className={S.navbar}>
      <Image alt="logo" src={"/logo.png"} width={"30"} height={"30"} />
      <div className={S.container}>
        <label className={S.label}>
          <button className={S.buttonSearch}>
            <SearchIcon />
          </button>
        </label>
        <input className={S.input} />
      </div>
      <BellIcon />
      <HamburgerIcon />
    </nav>
  )
}
