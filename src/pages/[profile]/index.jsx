import { getSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import { Navbar } from "components/Navbar"

import S from "styles/Profile.module.css"

import InstagramIcon from "../../../icons/InstagramIcon"
import TwitterIcon from "../../../icons/TwitterIcon"
import { buscarUser } from "../../../lib/prisma"

import { PrismaClient } from "@prisma/client"

export default function Profile({
  user,
  usuarioLogado,
  estaSeguindo,
  followButton
}) {
  const router = useRouter()
  const { profile } = router.query

  async function followHandler() {
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
    await router.reload()
    return data
  }

  return (
    <>
      <Navbar />
      <div className={S.container}>
        <div className={S.userContainer}>
          {user.imagem ? (
            <Image
              src={user.imagem}
              width={100}
              height={100}
              alt="Profile Picture"
            />
          ) : (
            <Image
              src={"/profilepic.jpg"}
              width={100}
              height={100}
              alt="Profile Picture"
            />
          )}

          <div className={S.userInfo}>
            <h3>{user.nome}</h3>
            <div className={S["follow-followers"]}>
              <p>{user._count.seguindo} Seguindo</p>
              <p>{user._count.seguidores} Seguidores</p>
            </div>
          </div>
        </div>

        <div className={S.socialMedia}>
          {!estaSeguindo && !followButton && (
            <button className={S.button} onClick={followHandler}>
              Seguir
            </button>
          )}

          {estaSeguindo && !followButton && (
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
              />
            ))}
            <Link className={S.verMais} href={`/${profile}/assistidos`}>
              Ver mais
            </Link>
          </div>
        </div>

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
              />
            ))}
            <Link className={S.verMais} href={`/${profile}/recomendados`}>
              Ver mais
            </Link>
          </div>
        </div>

        <div className={S.carouselContainer}>
          <h3>Quer Ver</h3>
          <div className={S.carousel}>
            {user.QuerVer.slice(0, 15).map((poster) => (
              <Image
                src={poster.Poster}
                width={120}
                height={168}
                alt="Poster do filme"
                key={poster.id}
              />
            ))}
            <Link className={S.verMais} href={`/${profile}/querVer`}>
              Ver mais
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { profile } = context.query
  const prisma = new PrismaClient()
  const userSessions = await getSession(context)
  const res = await fetch(`https://zine-space.vercel.app/api/${profile}`)

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
    return {
      props: {
        user,
        usuarioLogado: {
          email: userSessions.user.email,
          nickname: idDoSeguidor.nickname
        },
        estaSeguindo: JSON.parse(JSON.stringify(estaSeguindo)),
        followButton: idDoUsuario.id === idDoSeguidor.id ? true : false
      }
    }
  }
  return {
    props: { user }
  }
}
