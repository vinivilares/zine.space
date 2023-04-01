import Image from "next/image"
import Link from "next/link"

import S from "./FeedCard.module.css"

import CheckIcon from "../../../icons/CheckIcon"
import DislikeIcon from "../../../icons/DislikeIcon"
import EyeIcon from "../../../icons/EyeIcon"
import LikeIcon from "../../../icons/LikeIcon"
import StarIcon from "../../../icons/StarIcon"
import ThreeDotsIcon from "../../../icons/ThreeDotsIcon"

export function FeedCard({ name, userImage, movie, review, poster }) {
  return (
    <div className={S.feedCard}>
      <div className={S.info}>
        <div className={S.leftInfo}>
          <Image
            src={userImage} // TODO - Alterar o link da imagem vir do banco de dados
            alt="Image de perfil"
            width={"50"}
            height={"50"}
          />

          <div>
            <Link href={`/${name}`}>
              <h3>{name}</h3>
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

      <div className={S.reviewCard}>
        <p>{review}</p>
        <Image
          src={poster} // TODO - Alterar o link da imagem para vir do banco de dados
          alt="Poster"
          width={100}
          height={148}
        />
      </div>

      <div className={S.reviewOptions}>
        <div className={S.reviewIcon}>
          <EyeIcon />
          <p>1000</p>
        </div>

        <div className={S.reviewIcon}>
          <CheckIcon />
          <p>1M</p>
        </div>

        <div className={S.reviewIcon}>
          <LikeIcon />
          <p>203k</p>
        </div>

        <div className={S.reviewIcon}>
          <DislikeIcon />
          <p>10k</p>
        </div>
      </div>
    </div>
  )
}
