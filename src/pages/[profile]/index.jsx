import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import { useState } from "react"

import { Navbar } from "components/Navbar"

import S from "styles/Profile.module.css"

import InstagramIcon from "../../../icons/InstagramIcon"
import TwitterIcon from "../../../icons/TwitterIcon"

export default function Profile() {
  const router = useRouter()
  const { profile } = router.query

  const [follow, setFollow] = useState(false)

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
    },
    {
      id: 10,
      link: "https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_SX300.jpg"
    },
    {
      id: 11,
      link: "https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_SX300.jpg"
    },
    {
      id: 12,
      link: "https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_SX300.jpg"
    },
    {
      id: 13,
      link: "https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_SX300.jpg"
    },
    {
      id: 14,
      link: "https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_SX300.jpg"
    },
    {
      id: 15,
      link: "https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_SX300.jpg"
    },
    {
      id: 16,
      link: "https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_SX300.jpg"
    }
  ]

  return (
    <>
      <Navbar />
      <div className={S.container}>
        <div className={S.userContainer}>
          <Image
            src={"/profilepic.jpg"}
            width={100}
            height={100}
            alt="Profile Picture"
          />

          <div className={S.userInfo}>
            <h3>Roberta</h3>
            <div className={S["follow-followers"]}>
              <p>100k Seguindo</p>
              <p>10k Seguidores</p>
            </div>
          </div>
        </div>

        <div className={S.socialMedia}>
          {!follow && (
            <button className={S.button} onClick={() => setFollow(!follow)}>
              Seguir
            </button>
          )}

          {follow && (
            <button className={S.button} onClick={() => setFollow(!follow)}>
              Seguindo
            </button>
          )}

          <InstagramIcon />
          <TwitterIcon />
        </div>

        <div>
          <h4>Biografia</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
            doloremque cumque, numquam rem fugiat magni, perspiciatis, nulla
            necessitatibus pariatur dicta distinctio laboriosam nobis ea dolores
            rerum optio harum ad odio?
          </p>
        </div>

        <div className={S.badges}>
          <div>
            <p>Vistos</p>
            <p>15</p>
          </div>
          <div>
            <p>Indicados</p>
            <p>15</p>
          </div>
          <div>
            <p>Reviews</p>
            <p>15</p>
          </div>
        </div>

        <div className={S.carouselContainer}>
          <h3>Assistidos</h3>
          <div className={S.carousel}>
            {posters.slice(0, 15).map((poster) => (
              <Image
                src={poster.link}
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
            {posters.slice(0, 15).map((poster) => (
              <Image
                src={poster.link}
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
            {posters.slice(0, 15).map((poster) => (
              <Image
                src={poster.link}
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
