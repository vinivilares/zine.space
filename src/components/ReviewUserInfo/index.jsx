import Image from "next/image"
import Link from "next/link"

import S from "./ReviewUserInfo.module.css"

import StarIcon from "../../../icons/StarIcon"
import ThreeDotsIcon from "../../../icons/ThreeDotsIcon"

export default function ReviewUserInfo({ userImage, userName, movie }) {
  return (
    <div className={S.info}>
      <div className={S.leftInfo}>
        <Link href={`/${userName}`}>
          <Image
            src={userImage} // TODO - Alterar o link da imagem vir do banco de dados
            alt="Image de perfil"
            width={"50"}
            height={"50"}
          />
        </Link>
        <div>
          <Link href={`/${userName}`}>
            <h3>{userName}</h3>
          </Link>

          <div className={S.star}>
            <p>Assistiu - {movie}</p>
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
        </div>
      </div>

      <ThreeDotsIcon />
    </div>
  )
}
