import Image from "next/image"

import S from "./FeedCard.module.css"

import CheckIcon from "../../../Icons/CheckIcon"
import DislikeIcon from "../../../Icons/DislikeIcon"
import EyeIcon from "../../../Icons/EyeIcon"
import LikeIcon from "../../../Icons/LikeIcon"
import StarIcon from "../../../Icons/StarIcon"
import ThreeDotsIcon from "../../../Icons/ThreeDotsIcon"

export function FeedCard() {
  return (
    <div className={S.feedCard}>
      <div className={S.info}>
        <div className={S.leftInfo}>
          <Image
            src={"/profilepic.jpg"}
            alt="Image de perfil"
            width={"50"}
            height={"50"}
          />

          <div>
            <h3>Roberta</h3>
            <div className={S.star}>
              <p>Assistiu Akira</p>
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
          </div>
        </div>

        <ThreeDotsIcon />
      </div>

      <div className={S.reviewCard}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          minus et ut minima mollitia iure dolore optio iusto reiciendis
          suscipit voluptatibus repellat rem tempore harum, nam velit recusandae
          sunt debitis.
        </p>
        <Image
          src={
            "https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_SX300.jpg"
          }
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
