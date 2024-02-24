import Image from "next/image"

import S from "./NotificationMenu.module.css"

import CloseIcon from "../../../icons/CloseIcon"

export default function NotificationMenu({ id, onClick, notifications }) {
  return (
    <div className={S.notificationList} id={id}>
      <div className={S.topSide}>
        <div className={S.header}>
          <h2 className={S.h2}>Notificações</h2>
          <button onClick={onClick} className={S.closeIcon}>
            <CloseIcon />
          </button>
        </div>
      </div>

      <ul>
        {notifications.map((item) => {
          const date = new Date(item.createdAt)
          const formattedDate = date.toLocaleString()

          return (
            <li className={S.notificationItem} key={item.id}>
              <Image
                src={
                  item.userId?.imagem ? item.userId?.imagem : "/profilepic.png"
                }
                width={50}
                height={50}
                alt="Foto perfil"
              />
              <div>
                <p>{`${item.idUser[0]?.nome} te seguiu`}</p>
                <p>{formattedDate}</p>
              </div>
            </li>
          )
        })}
      </ul>

      <div className={S.clearNotifications}>
        <p>Notificações serão excluidas automaticamente após 7 dias</p>
      </div>
    </div>
  )
}
