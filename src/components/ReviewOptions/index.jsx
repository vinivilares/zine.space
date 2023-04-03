import S from "./ReviewOptions.module.css"

import CheckIcon from "../../../icons/CheckIcon"
import DislikeIcon from "../../../icons/DislikeIcon"
import EyeIcon from "../../../icons/EyeIcon"
import LikeIcon from "../../../icons/LikeIcon"

export default function ReviewOptions() {
  return (
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
  )
}
