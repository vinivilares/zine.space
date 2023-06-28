import Image from "next/image"
import Link from "next/link"

// import { FeedCard } from "components/FeedCard"

import { Navbar } from "components/Navbar"
import ReviewOptions from "components/ReviewOptions"
import ReviewUserInfo from "components/ReviewUserInfo"

import S from "styles/Feed.module.css"

export default function Feed() {
  return (
    <>
      <Navbar />
      <div className={S.container}>
        <ReviewUserInfo
          userImage={"/profilepic.jpg"}
          userName={"Roberta"}
          movie={"Akira"}
          rate={3}
        />

        <div className={S.feedCard}>
          <Link href={`roberta/review/1`}>
            <div className={S.reviewCard}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                sunt eaque cupiditate illo voluptate incidunt fuga aperiam modi
                aspernatur repudiandae quas, dolor temporibus reiciendis facilis
                facere? Quisquam officiis repellendus ipsa! Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Est sunt eaque cupiditate
                illo voluptate incidunt fuga aperiam modi aspernatur repudiandae
                quas, dolor temporibus reiciendis facilis facere? Quisquam
                officiis repellendus ipsa! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Est sunt eaque cupiditate illo
                voluptate incidunt fuga aperiam modi aspernatur repudiandae
                quas, dolor temporibus reiciendis facilis facere? Quisquam
                officiis repellendus ipsa! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Est sunt eaque cupiditate illo
                voluptate incidunt fuga aperiam modi aspernatur repudiandae
                quas, dolor temporibus reiciendis facilis facere? Quisquam
                officiis repellendus ipsa! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Est sunt eaque cupiditate illo
                voluptate incidunt fuga aperiam modi aspernatur repudiandae
                quas, dolor temporibus reiciendis facilis facere? Quisquam
                officiis repellendus ipsa! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Est
              </p>
              <Image
                src="https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_SX300.jpg"
                // TODO - Alterar o link da imagem para vir do banco de dados
                alt="Poster"
                width={100}
                height={148}
              />
            </div>
          </Link>
        </div>

        <ReviewOptions />
      </div>

      <div className={S.container}>
        <ReviewUserInfo
          userImage={"/profilepic.jpg"}
          userName={"Roberta"}
          movie={"Akira"}
          rate={3}
        />

        <div className={S.feedCard}>
          <Link href={`roberta/review/1`}>
            <div className={S.reviewCard}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                sunt eaque cupiditate illo voluptate incidunt fuga aperiam modi
                aspernatur repudiandae quas, dolor temporibus reiciendis facilis
                facere? Quisquam officiis repellendus ipsa! Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Est sunt eaque cupiditate
                illo voluptate incidunt fuga aperiam modi aspernatur repudiandae
                quas, dolor temporibus reiciendis facilis facere? Quisquam
                officiis repellendus ipsa! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Est sunt eaque cupiditate illo
                voluptate incidunt fuga aperiam modi aspernatur repudiandae
                quas, dolor temporibus reiciendis facilis facere? Quisquam
                officiis repellendus ipsa! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Est sunt eaque cupiditate illo
                voluptate incidunt fuga aperiam modi aspernatur repudiandae
                quas, dolor temporibus reiciendis facilis facere? Quisquam
                officiis repellendus ipsa! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Est sunt eaque cupiditate illo
                voluptate incidunt fuga aperiam modi aspernatur repudiandae
                quas, dolor temporibus reiciendis facilis facere? Quisquam
                officiis repellendus ipsa! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Est
              </p>
              <Image
                src="https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_SX300.jpg"
                // TODO - Alterar o link da imagem para vir do banco de dados
                alt="Poster"
                width={100}
                height={148}
              />
            </div>
          </Link>
        </div>

        <ReviewOptions />
      </div>
    </>
  )
}
