import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import { useRef } from "react"

import { Navbar } from "components/Navbar"

import styles from "styles/Search.module.css"

import NavigateAfter from "../../../icons/NavigateAfter"
import NavigateBefore from "../../../icons/NavigateBefore"

export async function getServerSideProps(ctx) {
  const results = []
  let pages = []
  let search

  if (ctx.query.type) {
    search = await fetch(
      // eslint-disable-next-line no-undef
      `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDBAPIKEY}&s=${ctx.query.s}&type=${ctx.query.type}&page=${ctx.query.page}`
    )
  } else {
    search = await fetch(
      // eslint-disable-next-line no-undef
      `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDBAPIKEY}&s=${ctx.query.s}&page=${ctx.query.page}`
    )
  }

  const data = await search.json()

  if (data.Search) {
    results.push(...data.Search)
  }

  const totalPages = Math.ceil(data.totalResults / 10)

  for (let index = 0; index < totalPages; index++) {
    pages.push(index + 1)
  }

  return {
    props: { results, pages }
  }
}

export default function Search({ results, pages }) {
  const router = useRouter()
  const page = useRef(1)

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.busca}>
          Resultados para &quot;{router.query.s}&quot;
        </h1>
        <div className={styles.filter}>
          <button
            onClick={() => {
              router.push(`/search?s=${router.query.s}`)
              page.current.value = 1
            }}
          >
            Todos
          </button>
          <button
            onClick={() => {
              router.push(`/search?s=${router.query.s}&type=movie`)
              page.current.value = 1
            }}
          >
            Filmes
          </button>
          <button
            onClick={() => {
              router.push(`/search?s=${router.query.s}&type=series`)
              page.current.value = 1
            }}
          >
            Séries
          </button>
          <button
            onClick={() => {
              router.push(`/search?s=${router.query.s}&type=game`)
              page.current.value = 1
            }}
          >
            Games
          </button>
          <button>Usuário</button>
        </div>

        {results.map((result, index) => (
          <Link key={index} href={`/movie/${result.imdbID}`}>
            <div className={styles.filme} key={result.imdbID}>
              {result.Poster != "N/A" ? (
                <Image
                  src={result.Poster}
                  width={120}
                  height={168}
                  alt={`Poster de ${result.Title}`}
                  priority
                />
              ) : (
                <Image
                  src="/poster.jpg"
                  width={120}
                  height={168}
                  alt={`Poster não encontrado de ${result.Title}`}
                />
              )}

              <div className={styles.descricao}>
                <h2>{result.Title}</h2>
                <p>{result.Year}</p>
              </div>
            </div>
          </Link>
        ))}

        <div className={styles.pages}>
          {page.current.value > 1 ? (
            <NavigateBefore
              onClick={() =>
                router.push(
                  `/search?s=${router.query.s}&type=${
                    router.query.type
                  }&page=${--page.current.value}`
                )
              }
            />
          ) : null}

          <select
            ref={page}
            onChange={() =>
              router.push(
                `/search?s=${router.query.s}&[?type=${router.query.type}]&page=${page.current.value}`
              )
            }
          >
            {pages.map((page, index) => (
              <option key={index}>{index + 1}</option>
            ))}
          </select>
          {page.current.value == pages.length ? null : (
            <NavigateAfter
              onClick={() =>
                router.push(
                  `/search?s=${router.query.s}&[?type=${
                    router.query.type
                  }]&page=${++page.current.value}`
                )
              }
            />
          )}
        </div>

        <div className={styles.separador}></div>

        <div className={styles.pessoa}>
          <Image
            src="/profilepic.jpg"
            width={80}
            height={80}
            alt="Foto de perfil"
          />
          <div className={styles.name}>
            <h3>Roro</h3>
            <p>@roro22</p>
          </div>
        </div>

        <div className={styles.pessoa}>
          <Image
            src="/profilepic.jpg"
            width={80}
            height={80}
            alt="Foto de perfil"
          />
          <div className={styles.name}>
            <h3>Roro</h3>
            <p>@roro22</p>
          </div>
        </div>
      </div>
    </>
  )
}