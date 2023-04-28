import Image from "next/image"

import S from "./NotificationScreen.module.css"

export default function NotificationScreen() {
  const notifications = [
    {
      id: 1,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 2,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 3,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 4,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 5,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 6,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 7,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 8,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 9,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 10,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 11,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 12,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 13,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 14,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    }
  ]

  return (
    <div className={S.container}>
      <div className={S.title}>
        <h2 className={S.h2}>Notificações</h2>
      </div>

      <div className={S.notificationList}>
        {notifications.map((item) => (
          <div className={S.notification} key={item.id}>
            <Image src={item.img} width={50} height={50} alt="Foto perfil" />
            <div>
              <p>{item.text}</p>
              <p>{item.date}</p>
            </div>
          </div>
        ))}

        <div className={S.clearNotifications}>
          <p>Limpar notificações</p>
          <p>Notificações serão excluidas automaticamente após 15 dias</p>
        </div>
      </div>
    </div>
  )
}
