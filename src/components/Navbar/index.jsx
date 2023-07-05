/* eslint-disable no-undef */
// import Image from "next/image"
import Link from "next/link"

import { useState } from "react"

// import NotificationScreen from "components/NotificationScreen"
import SettingsMenu from "components/SettingsMenu"

import S from "./Navbar.module.css"

import BellIcon from "../../../icons/BellIcon"
import CloseIcon from "../../../icons/CloseIcon"
import HamburgerIcon from "../../../icons/HamburgerIcon"
import SearchIcon from "../../../icons/SearchIcon"

export function Navbar() {
  // const [seeNotification, setSeeNotification] = useState(false)
  const [seeSettingsMenu, setSeeSettingsMenu] = useState(false)

  // function handleNotifications() {
  //   setSeeNotification((current) => !current)
  // }

  function handleSettingsMenu() {
    setSeeSettingsMenu((current) => !current)
  }

  return (
    <>
      {/* {seeSideMenu && <SideMenu />}

      <nav className={S.navbar} id="navbar">
        <Link href={"/feed"}>
          <Image alt="Zine Logo" src={"/logo.svg"} width={"30"} height={"30"} />
        </Link>

        <input className={S.input} />

       

        <button onClick={handleNotifications}>
          <BellIcon />
        </button>

        <button onClick={handleSideMenu} id="hamburgerIcon">
          {!seeSideMenu && <HamburgerIcon />}
          {seeSideMenu && <CloseIcon />}
        </button>
      </nav>

      {seeNotification && <NotificationScreen />} */}

      <nav className={S.navbar}>
        <Link href={"/feed"}>
          <h2>Zine</h2>
        </Link>

        <div className={S.input}>
          <input />
          <button>
            <SearchIcon />
          </button>
        </div>

        <ul className={S.navigation}>
          <li>
            <button>
              <BellIcon />
            </button>

            <button onClick={handleSettingsMenu} id="hamburgerIcon">
              {!seeSettingsMenu ? <HamburgerIcon /> : <CloseIcon />}
            </button>
          </li>
        </ul>
      </nav>
      {seeSettingsMenu && <SettingsMenu />}
    </>
  )
}
