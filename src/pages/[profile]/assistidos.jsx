import Image from "next/image"
import Link from "next/link"

import { Navbar } from "components/Navbar"

import styles from "styles/Assistidos.module.css"

export default function Assistidos({ user }) {
  console.log(user.Assistidos[0].idFilme)
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.topo}>
          <Image
            className={styles.foto}
            src={user.imagem}
            width={50}
            height="50"
            alt="Foto de perfil"
          />
          <h2 className={styles.titulo}>{user.nome} Assistiu</h2>
        </div>
        <div className={styles.grid}>
          <div className={styles.posters}>
            {user.Assistidos.map((poster) => (
              <Link key={poster.id} href={`/movie/${poster.idFilme}`}>
                <Image
                  src={poster.Poster}
                  width={120}
                  height={168}
                  alt="Poster do filme"
                  key={Assistidos.id}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { profile } = context.query
  const res = await fetch(
    `https://zine-space.vercel.app/api/${profile}/assistidos`
  )
  const user = await res.json()
  return {
    props: { user }
  }
}
