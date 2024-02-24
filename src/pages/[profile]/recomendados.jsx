import { getSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import { Navbar } from "components/Navbar"

import styles from "styles/Recomendados.module.css"

import { getNotifications } from "../../../lib/notifications"
import { prisma } from "../../../lib/prisma"

export default function Recomendados({
  user,
  usuarioLogado,
  notificationsData
}) {
  return (
    <>
      <Head>
        <title>{`Zine - ${user.nome} recomenda`}</title>
      </Head>
      <Navbar
        nickname={usuarioLogado?.nickname}
        notificacoes={notificationsData}
      />
      <div className={styles.container}>
        <div className={styles.topo}>
          <Image
            className={styles.foto}
            src={user.imagem ? user.imagem : "/profilepic.png"}
            width={50}
            height="50"
            alt="Foto de perfil"
          />

          <h2 className={styles.titulo}>{user.nome} Recomenda</h2>
        </div>
        <div className={styles.grid}>
          <div className={styles.posters}>
            {user.Recomendados.map((poster) => (
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
  const userSession = await getSession(context)
  const { profile } = context.query
  const res = await fetch(
    `https://zine-space.vercel.app/api/${profile}/recomendados`
  )
  const user = await res.json()

  if (userSession) {
    const usuarioLogado = await prisma.users.findFirst({
      where: { email: userSession.user.email },
      select: { nickname: true, id: true }
    })

    const notificationsData = await getNotifications(usuarioLogado)

    await prisma.$disconnect()

    return {
      props: { user, usuarioLogado, notificationsData }
    }
  }

  return {
    props: { user }
  }
}
