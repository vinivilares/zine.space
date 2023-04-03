import Image from "next/image"

import { Navbar } from "components/Navbar"

import styles from "styles/Assistidos.module.css"

export default function Assistidos() {
  const posters = [
    {
      id: 1,
      link: "https://m.media-amazon.com/images/M/MV5BYTQ5OTkxNGEtZjZkMS00ZjBlLWE2OWYtM2ZkOTU3MjRlNzAxXkEyXkFqcGdeQXVyMTQzNTA5MzYz._V1_SX300.jpg"
    },
    {
      id: 2,
      link: "https://m.media-amazon.com/images/M/MV5BMzdjNjI5MmYtODhiNS00NTcyLWEzZmUtYzVmODM5YzExNDE3XkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_SX300.jpg"
    },
    {
      id: 3,
      link: "https://m.media-amazon.com/images/M/MV5BNDM2ODNiMWItOWRkNS00ODE3LWE2OGYtNTZkMDJkOWI1ODMxXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_SX300.jpg"
    },
    {
      id: 4,
      link: "https://m.media-amazon.com/images/M/MV5BZjAyMGMwYTEtNDk4ZS00YmY0LThhZjUtOWI4ZjFmZmU4N2I3XkEyXkFqcGdeQXVyMTEyNzQ1MTk0._V1_SX300.jpg"
    },
    {
      id: 5,
      link: "https://m.media-amazon.com/images/M/MV5BNjRiMzM1N2UtMWE1ZC00MGMxLThkM2UtMGIyNWFiZWY3OGE4XkEyXkFqcGdeQXVyMTUzMzY2NDQy._V1_SX300.jpg"
    },
    {
      id: 6,
      link: "https://m.media-amazon.com/images/M/MV5BNGZhYWIyZWUtOTdjZS00ZTc1LWFlZDMtNzU5MTE0OTcyMjg1XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg"
    },
    {
      id: 7,
      link: "https://m.media-amazon.com/images/M/MV5BZDQ4Njg4YTctNGZkYi00NWU1LWI4OTYtNmNjOWMyMjI1NWYzXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_SX300.jpg"
    },
    {
      id: 8,
      link: "https://m.media-amazon.com/images/M/MV5BZjY5MDFhZTgtOGVhMi00NTUzLTk5NjktNmRlMjI3NjI4MmE0XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg"
    },
    {
      id: 9,
      link: "https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_SX300.jpg"
    }
  ]
  return (
    <>
      <Navbar />
      <div className={styles.topo}>
        <Image
          className={styles.foto}
          src="/profilepic.jpg"
          width={50}
          height="50"
          alt="Foto de perfil"
        />
        <h3 className={styles.titulo}>Listas de assistidos por Roberta</h3>
      </div>
      <div className={styles.grid}>
        <div className={styles.posters}>
          {posters.map((poster) => (
            <Image
              src={poster.link}
              width={120}
              height={168}
              alt="Poster do filme"
              key={poster.id}
            />
          ))}
        </div>
      </div>
    </>
  )
}
