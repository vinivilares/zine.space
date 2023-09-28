import Image from "next/image"
import { useRouter } from "next/router"

import { Navbar } from "components/Navbar"

import styles from "styles/Search.module.css"

export async function getServerSideProps(ctx) {
  const results = []

  let page = 1
  let data

  do {
    const search = await fetch(
      // eslint-disable-next-line no-undef
      `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDBAPIKEY}&s=${ctx.query.s}&page=${page}`
    )

    data = await search.json()

    if (data.Search) {
      results.push(...data.Search)
    }

    page++
  } while (data.Response === "True")

  return {
    props: { results }
  }
}

export default function Search({ results }) {
  const router = useRouter()

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.busca}>
          Resultados para &quot;{router.query.s}&quot;
        </h1>
        <div className={styles.filter}>
          <h3>Todos</h3>
          <h3>Filmes</h3>
          <h3>Séries</h3>
          <h3>Usuário</h3>
        </div>

        {results.map((result) => (
          <div className={styles.filme} key={result.imdbID}>
            {/* Image,Title, ano , diretor, IMDB, Rotten */}
            {result.Poster != "N/A" ? (
              <Image
                src={result.Poster}
                width={120}
                height={168}
                alt={`Poster de ${result.Title}`}
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
        ))}

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
