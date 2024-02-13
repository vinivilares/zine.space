import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import { Navbar } from "components/Navbar"

import styles from "styles/QuerVer.module.css"

export default function querVer({ user }) {
  return (
    <>
      <Head>
        <title>Zine - </title>
      </Head>
      <Navbar />
      <div>
        <div className={styles.topo}>
          {user.imagem ? (
            <Image
              className={styles.foto}
              src={user.imagem}
              width={50}
              height="50"
              alt="Foto de perfil"
            />
          ) : (
            <Image
              className={styles.foto}
              src="/profilepic.jpg"
              width={50}
              height="50"
              alt="Foto de perfil"
            />
          )}
          <h2 className={styles.titulo}>{user.nome} Quer ver</h2>
        </div>
        <div className={styles.grid}>
          <div className={styles.posters}>
            {user.QuerVer.map((poster) => (
              <Link key={poster.id} href={`/movie/${poster.idFilme}`}>
                <Image
                  src={poster.Poster}
                  width={120}
                  height={168}
                  alt="Poster do filme"
                  key={poster.id}
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
    `https://zine-space.vercel.app/api/${profile}/querVer`
  )
  const user = await res.json()
  return {
    props: { user }
  }
}
