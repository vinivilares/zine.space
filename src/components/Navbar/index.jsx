/* eslint-disable no-undef */
import Image from "next/image"
import Link from "next/link"

import { useState } from "react"

import NotificationScreen from "components/NotificationScreen"
import SideMenu from "components/SideMenu"

import S from "./Navbar.module.css"

import BellIcon from "../../../icons/BellIcon"
import CloseIcon from "../../../icons/CloseIcon"
import HamburgerIcon from "../../../icons/HamburgerIcon"
import SearchIcon from "../../../icons/SearchIcon"

export function Navbar() {
  const [seeNotification, setSeeNotification] = useState(false)
  const [seeSideMenu, setSeeSideMenu] = useState(false)

  function handleNotifications() {
    setSeeNotification((current) => !current)
  }

  function handleSideMenu() {
    setSeeSideMenu((current) => !current)
  }

  return (
    <>
      {seeSideMenu && <SideMenu />}

      <nav className={S.navbar} id="navbar">
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
        <button onClick={handleNotifications}>
          <BellIcon />
        </button>
        <button onClick={handleSideMenu} id="hamburgerIcon">
          {!seeSideMenu && <HamburgerIcon />}
          {seeSideMenu && <CloseIcon />}
        </button>
      </nav>
      {seeNotification && <NotificationScreen />}
    </>
  )
}
