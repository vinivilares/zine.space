import { prisma } from "./prisma"

export async function getNotifications(user) {
  const notifications = await fetch(
    "https://zine-space.vercel.app/api/notifications",
    {
      method: "POST",
      body: JSON.stringify({
        userId: user.id
      }),
      headers: { "Content-Type": "application/json" }
    }
  )

  const notificationsData = await notifications.json()

  const dataAtual = new Date()

  await Promise.all(
    notificationsData.map(async (item) => {
      const dataNotificacao = new Date(item.createdAt)

      dataNotificacao.setDate(dataNotificacao.getDate() + 7)

      // Se passou 7 dias delete
      if (dataAtual > dataNotificacao) {
        // eslint-disable-next-line no-unused-vars
        const deleteNotification = await prisma.notificacoes.delete({
          where: { id: item.id }
        })
      }
    })
  )

  await prisma.$disconnect()

  return notificationsData
}
