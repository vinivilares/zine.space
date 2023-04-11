import Image from "next/image"

import { Navbar } from "components/Navbar"

import styles from "styles/Movie.module.css"

export default function Movie() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Akira</h1>
        <p>1988 - R - animation, action, drama</p>

        <div className={styles.movie}>
          <Image
            src="https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_SX300.jpg"
            width={120}
            height="168"
            alt="Poster do filme"
          />
          <p>
            A secret military project endangers Neo-Tokyo when it turns a biker
            gang member into a rampaging psychic psychopath who can only be
            stopped by a teenager, his gang of biker friends and a group of
            psychics
          </p>
        </div>
        <button className={styles.button}>Adicionar</button>
        <h2 className={styles.sub}>Indicam</h2>

        <div className={styles.profile}>
          <div>
            <Image
              className={styles.foto}
              src="/profilepic.jpg"
              width={50}
              height="50"
              alt="Foto de perfil"
            />
            <p>Roberta</p>
          </div>
          <p>Ver perfil</p>
        </div>

        <div className={styles.profile}>
          <div>
            <Image
              className={styles.foto}
              src="/profilepic.jpg"
              width={50}
              height="50"
              alt="Foto de perfil"
            />
            <p>Roberta</p>
          </div>
          <p>Ver perfil</p>
        </div>

        <div className={styles.profile}>
          <div>
            <Image
              className={styles.foto}
              src="/profilepic.jpg"
              width={50}
              height="50"
              alt="Foto de perfil"
            />
            <p>Roberta</p>
          </div>
          <p>Ver perfil</p>
        </div>

        <h3 className={styles.h3}>Ver mais</h3>
        <hr className={styles.linha} />

        <h2 className={styles.sub}>Querem ver</h2>

        <div className={styles.profile}>
          <div>
            <Image
              className={styles.foto}
              src="/profilepic.jpg"
              width={50}
              height="50"
              alt="Foto de perfil"
            />
            <p>Roberta</p>
          </div>
          <p>Ver perfil</p>
        </div>

        <div className={styles.profile}>
          <div>
            <Image
              className={styles.foto}
              src="/profilepic.jpg"
              width={50}
              height="50"
              alt="Foto de perfil"
            />
            <p>Roberta</p>
          </div>
          <p>Ver perfil</p>
        </div>

        <div className={styles.profile}>
          <div>
            <Image
              className={styles.foto}
              src="/profilepic.jpg"
              width={50}
              height="50"
              alt="Foto de perfil"
            />
            <p>Roberta</p>
          </div>
          <p>Ver perfil</p>
        </div>
        <h3 className={styles.h3}>Ver mais</h3>
      </div>
    </>
  )
}
