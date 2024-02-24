/* eslint-disable no-undef */

import Image from "next/image"
import Link from "next/link"

import { useRef, useState } from "react"

import NotificationMenu from "components/NotificationMenu"
import SettingsMenu from "components/SettingsMenu"

import S from "./Navbar.module.css"

import BellIcon from "../../../icons/BellIcon"
import CloseIcon from "../../../icons/CloseIcon"
import HamburgerIcon from "../../../icons/HamburgerIcon"
import SearchIcon from "../../../icons/SearchIcon"

export function Navbar({ nickname, notificacoes }) {
  const searchText = useRef()
  const [results, setResults] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showResults, setShowResults] = useState(false)

  async function handleSearch() {
    const term = searchText.current.value

    if (!term) {
      return
    }

    try {
      const search = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDBAPIKEY}&s=${term}`
      )
      const data = await search.json()

      if (data.Response === "True") {
        setResults(data.Search || [])
        setSearchTerm(term)
        setShowResults(true)
      } else {
        setResults([])
        setSearchTerm("")
        setShowResults(false)
      }
    } catch (error) {
      console.error("Erro na busca:", error)
    }
  }

  function handleNotifications() {
    if (notifications.style.display == "flex") {
      notifications.style.display = "none"
    } else {
      notifications.style.display = "flex"
      notifications.style.flexDirection = "column"
      settingsMenu.style.display = "none"
      hamburgerMenu.style.display = "block"
      closeHamburgerMenu.style.display = "none"
      clearSearch()
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
      clearSearch()
    }
  }

  function clearSearch() {
    setResults([])
    setSearchTerm("")
    setShowResults(false)
    searchText.current.value = ""
  }

  return (
    <>
      <nav className={S.navbar}>
        <Link href={"/feed"} onClick={clearSearch}>
          <h2>Zine</h2>
        </Link>

        <div className={S.input}>
          <input
            type={"text"}
            placeholder="Pesquisar"
            ref={searchText}
            onChange={handleSearch}
          />

          <Link href={`/search?s=${searchTerm}`}>
            <button onClick={clearSearch}>
              <SearchIcon />
            </button>
          </Link>
        </div>

        {nickname && (
          <>
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

            <SettingsMenu
              id="settingsMenu"
              onClick={handleSettingsMenu}
              nickname={nickname}
            />

            <NotificationMenu
              id="notifications"
              onClick={handleNotifications}
              notifications={notificacoes}
            />
          </>
        )}

        {!nickname && <Link href={`/`}>Login</Link>}

        {showResults && results.length && searchTerm.length > 2 ? (
          <section className={S.search} id="search">
            <h2>Resultados para &quot;{searchTerm}&quot;</h2>

            {results.slice(0, 5).map((result, index) => (
              <Link
                key={index}
                href={`/movie/${result.imdbID}`}
                onClick={clearSearch}
              >
                <div className={S.movie}>
                  {result.Poster === "N/A" ? (
                    <Image
                      src={"/poster.jpg"}
                      width={120}
                      height={168}
                      alt={`Poster não encontrado de ${result.Title}`}
                    />
                  ) : (
                    <Image
                      src={result.Poster}
                      width={120}
                      height={168}
                      alt={`Poster de ${result.Title}`}
                      priority
                    />
                  )}

                  <div>
                    <h2>{result.Title}</h2>
                    <p>{result.Year}</p>
                    <p>{result.Director}</p>
                  </div>
                </div>
              </Link>
            ))}

            {/* <h2>Usuários</h2>
            <div className={S.users}>
              <div>
                <Image
                  src={"/profilepic.jpg"}
                  width={50}
                  height={50}
                  alt="Profile Picture"
                />
                <p>Nome da pessoa</p>
              </div>
              <div>
                <Image
                  src={"/profilepic.jpg"}
                  width={50}
                  height={50}
                  alt="Profile Picture"
                />
                <p>Nome da pessoa</p>
              </div>
              <div>
                <Image
                  src={"/profilepic.jpg"}
                  width={50}
                  height={50}
                  alt="Profile Picture"
                />
                <p>Nome da pessoa</p>
              </div>
            </div> */}

            <Link href={`/search?s=${searchTerm}`}>
              <p className={S.verTudo}>Ver tudo</p>
            </Link>
          </section>
        ) : null}
      </nav>
    </>
  )
}
