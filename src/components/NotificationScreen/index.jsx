import Image from "next/image"

import S from "./NotificationScreen.module.css"

export default function NotificationScreen() {
  return (
    <div className={S.container}>
      <h2 className={S.h2}>Notificações</h2>
      <div className={S.notification}>
        <Image
          src={"/profilepic.jpg"}
          width={50}
          height={50}
          alt="Foto perfil"
        />
        <div>
          <p>Roberta recomendou Akira</p>
          <p>7 horas atras</p>
        </div>
      </div>
      <div className={S.notification}>
        <Image
          src={"/profilepic.jpg"}
          width={50}
          height={50}
          alt="Foto perfil"
        />
        <div>
          <p>Roberta recomendou Akira</p>
          <p>7 horas atras</p>
        </div>
      </div>
      <div className={S.notification}>
        <Image
          src={"/profilepic.jpg"}
          width={50}
          height={50}
          alt="Foto perfil"
        />
        <div>
          <p>Roberta recomendou Akira</p>
          <p>7 horas atras</p>
        </div>
      </div>

      <div className={S.clearNotifications}>
        <p>Limpar notificações</p>
        <p>Notificações serão excluidas automaticamente após 15 dias</p>
      </div>
    </div>
  )
}
