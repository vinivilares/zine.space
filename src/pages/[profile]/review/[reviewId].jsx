import Image from "next/image"
// import Link from "next/link"

// import { FeedCard } from "components/FeedCard"
import { Navbar } from "components/Navbar"
import ReviewOptions from "components/ReviewOptions"
import ReviewUserInfo from "components/ReviewUserInfo"

import S from "styles/Review.module.css"

export default function Review() {
  return (
    <div className={S.container}>
      <Navbar />
      <div className={S.container}>
        <div className={S.topo}>
          <ReviewUserInfo
            userName={"Roberta"}
            userImage={"/profilepic.jpg"}
            movie={"Akira"}
          />
        </div>
        <div className={S.review}>
          <div className={S.movie}>
            <Image
              src="https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_SX300.jpg"
              // TODO - Alterar o link da imagem para vir do banco de dados
              alt="Poster"
              width={100}
              height={148}
            />
            <div>
              <h3>Akira</h3>
              <p>1988 - R</p>
              <p>Animation, Action, Drama</p>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. In aperiam
            pariatur omnis dolorem, nam commodi explicabo officiis, rerum ut
            labore alias officia voluptatum hic! Id cumque fugiat rerum ad
            ipsam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. In
            aperiam pariatur omnis dolorem, nam commodi explicabo officiis,
            rerum ut labore alias officia voluptatum hic! Id cumque fugiat rerum
            ad ipsam. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            In aperiam pariatur omnis dolorem, nam commodi explicabo officiis,
            rerum ut labore alias officia voluptatum hic! Id cumque fugiat rerum
            ad ipsam. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            In aperiam pariatur omnis dolorem, nam commodi explicabo officiis,
            rerum ut labore alias officia voluptatum hic! Id cumque fugiat rerum
            ad ipsam. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            In aperiam pariatur omnis dolorem, nam commodi explicabo officiis,
            rerum ut labore alias officia voluptatum hic! Id cumque fugiat rerum
            ad ipsam. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            In aperiam pariatur omnis dolorem, nam commodi explicabo officiis,
            rerum ut labore alias officia voluptatum hic! Id cumque fugiat rerum
            ad ipsam.
          </p>
        </div>


        <ReviewOptions />
      </div>
    </>
  )
}
