import Image from "next/image"
import Link from "next/link"

import S from "./ReviewUserInfo.module.css"

import StarIcon from "../../../icons/StarIcon"
import ThreeDotsIcon from "../../../icons/ThreeDotsIcon"

export default function ReviewUserInfo({
  userImage,
  nome,
  nickname,
  movie,
  nota = 0
}) {
  return (
    <div className={S.info}>
      <div className={S.leftInfo}>
        <Link href={`/${nickname}`}>
          <Image
            src={userImage} // TODO - Alterar o link da imagem vir do banco de dados
            alt={`Image de ${nome}`}
            width={"50"}
            height={"50"}
          />
        </Link>
        <div>
          <Link href={`/${nickname}`}>
            <h3>{nome}</h3>
          </Link>

          <div className={S.star}>
            <p>Assistiu - {movie}</p>
            {[...Array(nota)].map((e, i) => (
              <span key={i}>
                <StarIcon />
              </span>
            ))}
          </div>
        </div>
      </div>

      <ThreeDotsIcon />
    </div>
  )
}
