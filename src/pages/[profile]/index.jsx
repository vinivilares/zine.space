import { getSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import { Navbar } from "components/Navbar"

import S from "styles/Profile.module.css"

import InstagramIcon from "../../../icons/InstagramIcon"
import TwitterIcon from "../../../icons/TwitterIcon"
import { getNotifications } from "../../../lib/notifications"
import { buscarUser, prisma } from "../../../lib/prisma"

export default function Profile({
  user,
  usuarioLogado,
  estaSeguindo,
  followButton,
  notificationsData,
  idDoUsuario,
  idDoSeguidor
}) {
  const router = useRouter()
  const { profile } = router.query

  async function followHandler() {
    try {
      const response = await fetch(`/api/${user.nickname}`, {
        method: "PUT",
        body: JSON.stringify({
          usuarioLogado: usuarioLogado.email
        }),
        headers: {
          "Content-type": "application/json"
        }
      })

      const data = await response.json()

      await notificationHandler()

      router.reload()

      return data
    } catch (error) {
      alert(error.message)
    }
  }

  async function notificationHandler() {
    const response = await fetch(`/api/notifications`, {
      method: "PUT",
      body: JSON.stringify({
        idDoUsuario,
        idDoSeguidor
      }),
      headers: {
        "Content-type": "application/json"
      }
    })

    const data = await response.json()

    return data
  }

  return (
    <>
      <Head>
        <title>{`Zine - ${user.nome}`}</title>
      </Head>
      <Navbar
        nickname={usuarioLogado?.nickname}
        notificacoes={notificationsData}
      />
      <div className={S.container}>
        <div className={S.userContainer}>
          <Image
            src={user.imagem ? user.imagem : "/profilepic.png"}
            width={100}
            height={100}
            alt="Profile Picture"
            priority
          />

          <div className={S.userInfo}>
            <h3>{user.nome}</h3>
            <div className={S["follow-followers"]}>
              <p>{user._count.seguindo} Seguindo</p>
              <p>{user._count.seguidores} Seguidores</p>
            </div>
          </div>
        </div>

        <div className={S.socialMedia}>
          {!estaSeguindo && !followButton && usuarioLogado && (
            <button className={S.button} onClick={followHandler}>
              Seguir
            </button>
          )}

          {estaSeguindo && !followButton && usuarioLogado && (
            <button className={S.button} onClick={followHandler}>
              Seguindo
            </button>
          )}

          {user.instagram && (
            <Link
              href={`https://www.instagram.com/${user.instagram}`}
              target="_blank"
            >
              <InstagramIcon />
            </Link>
          )}
          {user.twitter && (
            <Link
              href={`https://www.twitter.com/${user.twitter}`}
              target="_blank"
            >
              <TwitterIcon />
            </Link>
          )}
        </div>

        <div>
          <h4>Biografia</h4>
          <p>{user.biografia}</p>
        </div>

        <div className={S.badges}>
          <div>
            <p>Assitidos</p>
            <p>{user._count.Assistidos}</p>
          </div>
          <div>
            <p>Recomendados</p>
            <p>{user._count.Recomendados}</p>
          </div>
          <div>
            <p>Reviews</p>
            <p>{user._count.Reviews}</p>
          </div>
        </div>

        {user.Assistidos.length > 0 && (
          <div className={S.carouselContainer}>
            <h3>Assistidos</h3>
            <div className={S.carousel}>
              {user.Assistidos.slice(0, 15).map((poster) => (
                <Image
                  src={poster.Poster}
                  width={120}
                  height={168}
                  alt="Poster do filme"
                  key={poster.id}
                  priority
                />
              ))}
              <Link className={S.verMais} href={`/${profile}/assistidos`}>
                Ver mais
              </Link>
            </div>
          </div>
        )}

        {user.QuerVer.length > 0 && (
          <div className={S.carouselContainer}>
            <h3>Quer ver</h3>
            <div className={S.carousel}>
              {user.QuerVer.slice(0, 15).map((poster) => (
                <Image
                  src={poster.Poster}
                  width={120}
                  height={168}
                  alt="Poster do filme"
                  key={poster.id}
                  priority
                />
              ))}
              <Link className={S.verMais} href={`/${profile}/querVer`}>
                Ver mais
              </Link>
            </div>
          </div>
        )}

        {user.Recomendados.length > 0 && (
          <div className={S.carouselContainer}>
            <h3>Recomendados</h3>
            <div className={S.carousel}>
              {user.Recomendados.slice(0, 15).map((poster) => (
                <Image
                  src={poster.Poster}
                  width={120}
                  height={168}
                  alt="Poster do filme"
                  key={poster.id}
                  priority
                />
              ))}
              <Link className={S.verMais} href={`/${profile}/recomendados`}>
                Ver mais
              </Link>
            </div>
          </div>
        )}

        {user.NaoRecomendados.length > 0 && (
          <div className={S.carouselContainer}>
            <h3>Não recomendados</h3>
            <div className={S.carousel}>
              {user.NaoRecomendados.slice(0, 15).map((poster) => (
                <Image
                  src={poster.Poster}
                  width={120}
                  height={168}
                  alt="Poster do filme"
                  key={poster.id}
                  priority
                />
              ))}
              <Link className={S.verMais} href={`/${profile}/naoRecomendados`}>
                Ver mais
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { profile } = context.query
  const userSessions = await getSession(context)
  const res = await fetch(`https://zine-space.vercel.app/api/${profile}`)

  try {
    const res = await fetch(`https://zine-space.vercel.app/api/${profile}`)
    // eslint-disable-next-line no-unused-vars
    const user = await res.json()
  } catch (error) {
    if (error) {
      return {
        notFound: true
      }
    }
  }

  const user = await res.json()

  if (userSessions) {
    const idDoUsuario = await buscarUser(user.email)
    const idDoSeguidor = await buscarUser(userSessions.user.email)
    const estaSeguindo = await prisma.users.findFirst({
      where: {
        id: idDoUsuario.id,
        seguidores: {
          some: { id: idDoSeguidor.id }
        }
      }
    })

    const notificationsData = await getNotifications(idDoSeguidor)

    await prisma.$disconnect()

    return {
      props: {
        user,
        usuarioLogado: {
          email: userSessions.user.email,
          nickname: idDoSeguidor.nickname
        },
        estaSeguindo: JSON.parse(JSON.stringify(estaSeguindo)),
        followButton: idDoUsuario.id === idDoSeguidor.id ? true : false,
        notificationsData,
        idDoUsuario: idDoUsuario.id,
        idDoSeguidor: idDoSeguidor.id
      }
    }
  }

  return {
    props: { user }
  }
}
