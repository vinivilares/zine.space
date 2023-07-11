import Image from "next/image"

// import { useState } from "react"

import S from "./NotificationMenu.module.css"

import CloseIcon from "../../../icons/CloseIcon"

export default function NotificationMenu({ id, onClick }) {
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
    },
    {
      id: 15,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 16,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 17,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 18,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira",
      date: "7 horas atras"
    },
    {
      id: 19,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira 1",
      date: "7 horas atras"
    },
    {
      id: 20,
      img: "/profilepic.jpg",
      text: "Jose recomendou Akira 2",
      date: "7 horas atras"
    }
  ]

  return (
    <div className={S.notificationList} id={id}>
      <div className={S.header}>
        <h2 className={S.h2}>Notificações</h2>
        <button onClick={onClick} className={S.closeIcon}>
          <CloseIcon />
        </button>
      </div>

      <ul>
        {notifications.map((item) => (
          <li className={S.notificationItem} key={item.id}>
            <Image src={item.img} width={50} height={50} alt="Foto perfil" />
            <div>
              <p>{item.text}</p>
              <p>{item.date}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className={S.clearNotifications}>
        <p>Limpar notificações</p>
        <p>Notificações serão excluidas automaticamente após 15 dias</p>
      </div>
    </div>
  )
}
