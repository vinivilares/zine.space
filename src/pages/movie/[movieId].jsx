import Image from "next/image"
import Link from "next/link"

import { Navbar } from "components/Navbar"

import styles from "styles/Movie.module.css"

export async function getServerSideProps(context) {
  const res = await fetch(
    // eslint-disable-next-line no-undef
    `http://www.omdbapi.com/?i=${context.query.movieId}&apikey=${process.env.NEXT_PUBLIC_OMDBAPIKEY}&plot=full`
  )

  const movie = await res.json()

  return {
    props: { movie }
  }
}

export default function Movie({ movie }) {
  const pessoas = [
    { id: 1, img: "/profilepic.jpg", nome: "Roberta 1" },
    { id: 2, img: "/profilepic.jpg", nome: "Roberta 2" },
    { id: 3, img: "/profilepic.jpg", nome: "Roberta 3" },
    { id: 4, img: "/profilepic.jpg", nome: "Roberta 4" },
    { id: 5, img: "/profilepic.jpg", nome: "Roberta 5" },
    { id: 6, img: "/profilepic.jpg", nome: "Roberta 6" }
  ]
  return (
    <>
      <Navbar />
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
            <h1>{movie.Title}</h1>
            <p>{movie.Runtime}</p>
            <p>
              {movie.Director != "N/A" ? movie.Director : movie.Writer} -{" "}
              {movie.Year}
            </p>
            <p>{movie.Rated}</p>
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

        <button className={styles.button}>Adicionar</button>

        <p className={styles.sinopse}>{movie.Plot}</p>

        <div className={styles.carousel}>
          <div>
            <h2>Amigos que viram</h2>
            <ul className={styles.friends}>
              {pessoas.map((pessoa) => (
                <li key={pessoa.id}>
                  <Image
                    src="/profilepic.jpg"
                    width={100}
                    height={100}
                    alt="Foto de perfil"
                  />
                  <p>{pessoa.nome}</p>
                </li>
              ))}
              <li>
                <Link href="#">Ver mais</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2>Amigos que indicam</h2>
            <ul className={styles.friends}>
              {pessoas.map((pessoa) => (
                <li key={pessoa.id}>
                  <Image
                    src="/profilepic.jpg"
                    width={100}
                    height={100}
                    alt="Foto de perfil"
                  />
                  <p>{pessoa.nome}</p>
                </li>
              ))}
              <li className={styles.vermais}>
                <Link href="#">Ver mais</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
