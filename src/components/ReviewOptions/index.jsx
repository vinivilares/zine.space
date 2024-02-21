import S from "./ReviewOptions.module.css"

import CheckIcon from "../../../icons/CheckIcon"
import DislikeIcon from "../../../icons/DislikeIcon"
import EyeIcon from "../../../icons/EyeIcon"
import LikeIcon from "../../../icons/LikeIcon"

export default function ReviewOptions({
  assistiram,
  querVer,
  recomendam,
  naoRecomendam,
  title
}) {
  return (
    <div className={S.reviewOptions}>
      <div
        className={S.reviewIcon}
        title={`${querVer} pessoas querem ver ${title}`}
      >
        <EyeIcon />
        <p>{querVer}</p>
      </div>

      <div
        className={S.reviewIcon}
        title={`${assistiram} pessoas já viram ${title}`}
      >
        <CheckIcon />
        <p>{assistiram}</p>
      </div>

      <div
        className={S.reviewIcon}
        title={`${recomendam} pessoas recomendam ${title}`}
      >
        <LikeIcon />
        <p>{recomendam}</p>
      </div>

      <div
        className={S.reviewIcon}
        title={`${naoRecomendam} pessoas não recomendam ${title}`}
      >
        <DislikeIcon />
        <p>{naoRecomendam}</p>
      </div>
    </div>
  )
}
