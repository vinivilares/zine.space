import Image from "next/image"
import Link from "next/link"

import { Navbar } from "components/Navbar"

import styles from "styles/Movie.module.css"

export default function Movie() {
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
              src="https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_SX300.jpg"
              width={300}
              height={444}
              alt="Poster do filme"
            />
          </div>

          {/* Right */}
          <div>
            <h1>Akira</h1>
            <p>Katsuhiro Otomo - 1988</p>
            <p>14 - Ficção cientifica/Ação</p>
            <p>IMDB 4.3</p>
          </div>
        </div>

        <button className={styles.button}>Adicionar</button>

        <p>
          2019. 31 years after being destroyed during World War 3, Tokyo (now
          &apos;Neo-Tokyo&lsquo;) has been rebuilt and is a thriving metropolis.
          Shotaro Kaneda is the leader of a biker gang. His friend Tetsuo is
          injured in an accident and taken to a top-secret government facility.
          He develops telekinetic powers but decides to use them for evil rather
          than good. He has the same powers as Akira, the force that destroyed
          Tokyo in 1988, and now it appears that history will repeat itself.
        </p>

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
              <li>
                <Link href="#">Ver mais</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
