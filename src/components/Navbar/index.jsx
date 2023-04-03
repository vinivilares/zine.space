import Image from "next/image"
import Link from "next/link"

import S from "./Navbar.module.css"

import BellIcon from "../../../icons/BellIcon"
import HamburgerIcon from "../../../icons/HamburgerIcon"
import SearchIcon from "../../../icons/SearchIcon"

export function Navbar() {
  return (
    <nav className={S.navbar}>
      <Link href={"/feed"}>
        <Image alt="Zine Logo" src={"/logo.png"} width={"30"} height={"30"} />
      </Link>
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
