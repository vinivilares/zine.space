import { getSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

// import { FeedCard } from "components/FeedCard"

import { Navbar } from "components/Navbar"
import ReviewOptions from "components/ReviewOptions"
import ReviewUserInfo from "components/ReviewUserInfo"

import S from "styles/Feed.module.css"

export default function Feed() {
  // signOut()
  return (
    <>
      <Navbar />
      <div className={S.container}>
        <div className={S.feedItem}>
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
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness. No one rejects, dislikes,
                  or avoids pleasure itself, because it is pleasure, but because
                  those who do not know how to pursue pleasure rationally
                  encounter consequences that are extremely painful. Nor again
                  is there anyone who loves or pursues or desires to obtain pain
                  of itself, because it is pain, but because occasionally
                  circumstances occur in which toil and pain can procure him
                  some great pleasure. To take a trivial example, which of us
                  ever undertakes laborious physical exercise, except to obtain
                  some advantage from it? But who has any right to find fault
                  with a man who chooses to enjoy a pleasure that has no
                  annoying consequences, or one who avoids a pain that produces
                  no resultant pleasure?
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

        <div className={S.feedItem}>
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
                  sunt eaque cupiditate illo voluptate incidunt fuga aperiam
                  modi aspernatur repudiandae quas, dolor temporibus reiciendis
                  facilis facere? Quisquam officiis repellendus ipsa! Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Est sunt
                  eaque cupiditate illo voluptate incidunt fuga aperiam modi
                  aspernatur repudiandae quas, dolor temporibus reiciendis
                  facilis facere? Quisquam officiis repellendus ipsa! Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Est sunt
                  eaque cupiditate illo voluptate incidunt fuga aperiam modi
                  aspernatur repudiandae quas, dolor temporibus reiciendis
                  facilis facere? Quisquam officiis repellendus ipsa! Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Est sunt
                  eaque cupiditate illo voluptate incidunt fuga aperiam modi
                  aspernatur repudiandae quas, dolor temporibus reiciendis
                  facilis facere? Quisquam officiis repellendus ipsa! Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Est sunt
                  eaque cupiditate illo voluptate incidunt fuga aperiam modi
                  aspernatur repudiandae quas, dolor temporibus reiciendis
                  facilis facere? Quisquam officiis repellendus ipsa! Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Est
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

        <div>
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
                  sunt eaque cupiditate illo voluptate incidunt fuga aperiam
                  modi aspernatur repudiandae quas, dolor temporibus reiciendis
                  facilis facere? Quisquam officiis repellendus ipsa! Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Est sunt
                  eaque cupiditate illo voluptate incidunt fuga aperiam modi
                  aspernatur repudiandae quas, dolor temporibus reiciendis
                  facilis facere? Quisquam officiis repellendus ipsa! Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Est sunt
                  eaque cupiditate illo voluptate incidunt fuga aperiam modi
                  aspernatur repudiandae quas, dolor temporibus reiciendis
                  facilis facere? Quisquam officiis repellendus ipsa! Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Est sunt
                  eaque cupiditate illo voluptate incidunt fuga aperiam modi
                  aspernatur repudiandae quas, dolor temporibus reiciendis
                  facilis facere? Quisquam officiis repellendus ipsa! Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Est sunt
                  eaque cupiditate illo voluptate incidunt fuga aperiam modi
                  aspernatur repudiandae quas, dolor temporibus reiciendis
                  facilis facere? Quisquam officiis repellendus ipsa! Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Est
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
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const userSession = await getSession(context)

  if (!userSession) {
    return {
      redirect: {
        destination: "/"
      }
    }
  } else {
    return {
      props: { userSession }
    }
  }
}
