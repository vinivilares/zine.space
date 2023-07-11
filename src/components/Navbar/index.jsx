/* eslint-disable no-undef */
// import Image from "next/image"
import Link from "next/link"

import NotificationMenu from "components/NotificationMenu"
import SettingsMenu from "components/SettingsMenu"

import S from "./Navbar.module.css"

import BellIcon from "../../../icons/BellIcon"
import CloseIcon from "../../../icons/CloseIcon"
import HamburgerIcon from "../../../icons/HamburgerIcon"
import SearchIcon from "../../../icons/SearchIcon"

export function Navbar() {
  function handleNotifications() {
    if (notifications.style.display == "grid") {
      notifications.style.display = "none"
    } else {
      notifications.style.display = "grid"
      settingsMenu.style.display = "none"
      hamburgerMenu.style.display = "block"
      closeHamburgerMenu.style.display = "none"
    }
  }

  function handleSettingsMenu() {
    if (settingsMenu.style.display == "grid") {
      settingsMenu.style.display = "none"
      hamburgerMenu.style.display = "block"
      closeHamburgerMenu.style.display = "none"
    } else {
      settingsMenu.style.display = "grid"
      hamburgerMenu.style.display = "none"
      closeHamburgerMenu.style.display = "block"
      notifications.style.display = "none"
    }
  }

  return (
    <>
      <nav className={S.navbar}>
        <Link href={"/feed"}>
          <h2>Zine</h2>
        </Link>

        <div className={S.input}>
          <input type={"text"} />
          <button>
            <SearchIcon />
          </button>
        </div>

        <ul className={S.navigation}>
          <li>
            <button onClick={handleNotifications}>
              <BellIcon />
            </button>
          </li>

          <li>
            <button onClick={handleSettingsMenu} id="hamburgerMenu">
              <HamburgerIcon />
            </button>
          </li>

          <li>
            <button
              onClick={handleSettingsMenu}
              className={S.closeHamburgerMenu}
              id="closeHamburgerMenu"
            >
              <CloseIcon />
            </button>
          </li>
        </ul>
      </nav>
      <SettingsMenu id="settingsMenu" onClick={handleSettingsMenu} />
      <NotificationMenu id="notifications" onClick={handleNotifications} />
    </>
  )
}
