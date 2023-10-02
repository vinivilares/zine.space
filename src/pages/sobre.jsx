import Link from "next/link"

import { Navbar } from "components/Navbar"

import S from "styles/Sobre.module.css"

export default function Sobre() {
  return (
    <>
      <Navbar />
      <div className={S.container}>
        <div className={S.sobre}>
          <p>Zine.Space - 2023</p>
          <p>
            <Link target={"_blank"} href={"https://github.com/ewerson2/"}>
              Ewerson
            </Link>{" "}
            &{" "}
            <Link target={"_blank"} href={"https://github.com/vinivilares/"}>
              Marcus
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
