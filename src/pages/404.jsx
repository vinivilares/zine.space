import Image from "next/image"

import { Navbar } from "components/Navbar"

import styles from "../styles/NotFound.module.css"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Image
          src={"/notfound.png"}
          width={205}
          height={142}
          alt="Balde de pipoca derramando"
        />
        <h2>Não foi possível encontrar essa pagina :&#40;</h2>
        <p>Erro 404 - Não encontrado</p>
      </div>
    </>
  )
}
