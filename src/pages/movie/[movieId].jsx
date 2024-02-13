// import { getSession } from "next-auth/react"
import { getSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import Dialog from "components/Dialog"
import { Navbar } from "components/Navbar"

import styles from "styles/Movie.module.css"

import CloseIcon from "../../../icons/CloseIcon"
import { buscarUser, prisma } from "../../../lib/prisma"

export async function getServerSideProps(context) {
  const userSession = await getSession(context)

  // Dados do filme
  const res = await fetch(
    // eslint-disable-next-line no-undef
    `http://www.omdbapi.com/?i=${context.query.movieId}&apikey=${process.env.NEXT_PUBLIC_OMDBAPIKEY}&plot=full`
  )

  const movie = await res.json()

  const idDoUsuario = await buscarUser(userSession.user.email)

  if (userSession) {
    const usuario = await fetch(
      `https://zine-space.vercel.app/api/movie/${movie.imdbID}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          usuarioLogado: userSession.user.email
        })
      }
    )

    const user = await usuario.json()

    const assistiu = await prisma.assistidos.findFirst({
      where: {
        idFilme: movie.imdbID,
        idUser: {
          // Note que aqui deve ser o nome da relação, não o campo
          some: {
            id: idDoUsuario.id
          }
        }
      }
    })

    const recomenda = await prisma.recomendados.findFirst({
      where: {
        idFilme: movie.imdbID,
        idUser: {
          // Note que aqui deve ser o nome da relação, não o campo
          some: {
            id: idDoUsuario.id
          }
        }
      }
    })

    const naoRecomenda = await prisma.naoRecomendados.findFirst({
      where: {
        idFilme: movie.imdbID,
        idUser: {
          // Note que aqui deve ser o nome da relação, não o campo
          some: {
            id: idDoUsuario.id
          }
        }
      }
    })

    const querVer = await prisma.querVer.findFirst({
      where: {
        idFilme: movie.imdbID,
        idUser: {
          // Note que aqui deve ser o nome da relação, não o campo
          some: {
            id: idDoUsuario.id
          }
        }
      }
    })

    return {
      props: {
        movie,
        usuario: JSON.parse(JSON.stringify(user)),
        idDoUsuario: idDoUsuario.id,
        assistiu: assistiu ? true : false,
        querVer: querVer ? true : false,
        recomenda: recomenda ? true : false,
        naoRecomenda: naoRecomenda ? true : false
      }
    }
  }

  if (movie.Response == "False") {
    return {
      notFound: true
    }
  }

  return {
    props: { movie }
  }
}

export default function Movie({
  movie,
  usuario,
  assistiu,
  querVer,
  idDoUsuario,
  recomenda,
  naoRecomenda
}) {
  const router = useRouter()
  async function addHandler(local) {
    // adicionar()
    const response = await fetch(`/api/movie/${movie.imdbID}`, {
      method: "PUT",
      body: JSON.stringify({
        movie: movie.imdbID,
        local,
        usuarioLogado: idDoUsuario
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
    const data = await response.json()
    router.reload()

    return data
  }

  function adicionar() {
    // eslint-disable-next-line no-undef
    if (lista.style.display == "block") {
      // eslint-disable-next-line no-undef
      lista.style.display = "none"
    } else {
      // eslint-disable-next-line no-undef
      lista.style.display = "block"
    }
  }

  function showDialog() {
    // eslint-disable-next-line no-undef
    dialog.showModal()
  }

  function closeDialog() {
    // eslint-disable-next-line no-undef
    dialog.close()
  }

  return (
    <>
      <Head>
        <title>Zine - {movie.Title}</title>
      </Head>

      <Navbar />

      <Dialog id={"dialog"}>
        <div>
          <h3>Recomenda esse filme ?</h3>
          <span onClick={closeDialog}>
            <CloseIcon />
          </span>
        </div>
        <div>
          <button
            onClick={() =>
              addHandler("assistidos").then(addHandler("recomendados"))
            }
          >
            Sim
          </button>
          <button
            onClick={() =>
              addHandler("assistidos").then(addHandler("naoRecomenda"))
            }
          >
            Não
          </button>
        </div>
      </Dialog>

      <div className={styles.container}>
        <div className={styles.movie}>
          {/* Left */}
          <div className={styles.movieLeft}>
            <Image
              src={movie.Poster}
              width={300}
              height={444}
              alt="Poster do filme"
            />
          </div>

          {/* Right */}
          <div>
            <h2>{movie.Title}</h2>
            <p>
              {movie.Runtime} - {movie.Year} - {movie.Rated}
            </p>
            <p>{movie.Director != "N/A" ? movie.Director : movie.Writer}</p>
            <p>{movie.Genre}</p>
            <p>{movie.Actors}</p>
            {movie.Ratings.map((item) => (
              <p key={item.Value}>
                {item.Source == "Internet Movie Database"
                  ? "IMDB"
                  : item.Source}
                : {item.Value}
              </p>
            ))}
          </div>
        </div>

        {/* Botão só aparece quando não adicionei em Assistidos ou Quer Ver */}
        {!querVer && !assistiu && (
          <button className={styles.button} onClick={adicionar}>
            Adicionar
          </button>
        )}

        {/* Só vai aparecer quando adicionar em Assisstidos */}
        {recomenda && (
          <button
            className={styles.button}
            onClick={() =>
              addHandler("assistidos")
                .then(addHandler("recomendados"))
                .then(router.reload())
            }
          >
            Remover
          </button>
        )}

        {naoRecomenda && (
          <button
            className={styles.button}
            onClick={() =>
              addHandler("assistidos")
                .then(addHandler("naoRecomenda"))
                .then(router.reload())
            }
          >
            Remover
          </button>
        )}

        {querVer && (
          <button className={styles.querVer} onClick={showDialog}>
            Assistir
          </button>
        )}

        {/* Só vai aparecer quando adicionar em Quer Ver */}
        {querVer && (
          <button
            className={styles.querVer}
            onClick={() => addHandler("querVer").then(router.reload())}
          >
            Remover
          </button>
        )}

        {/* Lista só vai aparecer quando não tiver adicionado o filme na lista */}
        <ul className={styles.lista} id="lista">
          <li onClick={showDialog}>
            <button className={styles.buttonList}>Assistido</button>
          </li>
          {!querVer && (
            <li onClick={() => addHandler("querVer")}>
              <button className={styles.buttonList}>Quero ver</button>
            </li>
          )}
        </ul>

        {assistiu && (
          <div className={styles.fazerReview}>
            <h3>Você já assistiu esse filme</h3>
            <button>Fazer review</button>
          </div>
        )}

        <p className={styles.sinopse}>{movie.Plot}</p>

        <div className={styles.carousel}>
          {/* Amigos que viram/jogaram */}
          {usuario.assistiram.length > 0 ? (
            <div>
              {movie.Type == "game" ? (
                <h2>Amigos que jogaram</h2>
              ) : (
                <h2>Amigos que viram</h2>
              )}

              <ul className={styles.friends}>
                {usuario.assistiram.map((pessoa) => (
                  <Link href={`/${pessoa.nickname}`} key={pessoa.id}>
                    <li>
                      <Image
                        src={
                          pessoa?.imagem ? pessoa?.imagem : "/profilepic.jpg"
                        }
                        width={100}
                        height={100}
                        alt={`Foto de ${pessoa.nome}`}
                      />
                      <p>{pessoa.nome}</p>
                    </li>
                  </Link>
                ))}
                {/* <li>
                  <Link href="#">Ver mais</Link>
                </li> */}
              </ul>
            </div>
          ) : null}

          {/* Amigos que recomendam */}
          {usuario.recomendam.length > 0 ? (
            <div>
              <h2>Amigos que recomendam</h2>
              <ul className={styles.friends}>
                {usuario.recomendam.map((pessoa) => (
                  <Link href={`/${pessoa.nickname}`} key={pessoa.id}>
                    <li>
                      <Image
                        src={
                          pessoa?.imagem ? pessoa?.imagem : "/profilepic.jpg"
                        }
                        width={100}
                        height={100}
                        alt={`Foto de ${pessoa.nome}`}
                      />
                      <p>{pessoa.nome}</p>
                    </li>
                  </Link>
                ))}
                {/* <li className={styles.vermais}>
                  <Link href="#">Ver mais</Link>
                </li> */}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
