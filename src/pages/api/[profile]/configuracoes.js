import { hashPassword, verifyPassword } from "../../../../lib/auth"
import { prisma } from "../../../../lib/prisma"

export default async function handler(req, res) {
  const { usuario } = req.body

  if (req.method === "PUT") {
    const inputData = usuario.dt_nascimento
    const inputDate = new Date(inputData)
    const currentDate = new Date()

    // Ajusta a data atual para o início do dia (00:00:00)
    currentDate.setHours(0, 0, 0, 0)

    if (inputDate > currentDate) {
      res.status(422).json({ message: "A data não pode ser futura" })
      throw new Error("A data não pode ser futura")
    }

    // Verificando se o nickname já foi utilizado
    const existingUser = await prisma.users.findFirst({
      where: { id: usuario.id },
      select: { senha: true }
    })

    // Verifica se email é válido
    if (usuario.novoEmail && !usuario.novoEmail.includes("@")) {
      res.status(422).json({
        message: "Dados inválidos - Email inválido"
      })
      throw new Error("Dados inválidos - Email inválido")
    }

    // Verifica tamanho da senha
    if (usuario.novaSenha && usuario.novaSenha.trim().length < 7) {
      res.status(422).json({
        message: "Dados inválidos - Senha deve possuir no mínimo 7 caracteres"
      })
      throw new Error(
        "Dados inválidos - Senha deve possuir no mínimo 7 caracteres"
      )
    }

    // Verifica se as senhas são iguais
    if (usuario.novaSenha !== usuario.repetirNovaSenha) {
      res.status(422).json({
        message: "Dados inválidos - As senhas devem ser iguais"
      })
      throw new Error("Dados inválidos - As senhas devem ser iguais")
    }

    if (usuario.senha && usuario.novaSenha && usuario.repetirNovaSenha) {
      const isValid = await verifyPassword(usuario.senha, existingUser.senha)
      if (!isValid) {
        throw new Error("Senha inválida")
      }

      const hashedPassword = await hashPassword(usuario.novaSenha)

      // eslint-disable-next-line no-unused-vars
      const user = await prisma.users.update({
        where: {
          id: usuario.id
        },
        data: {
          nickname: usuario.nickname,
          nome: usuario.nome,
          dt_nascimento: usuario.dt_nascimento + "T00:00:00.000Z",
          instagram: usuario.instagram,
          tiktok: usuario.tiktok,
          twitter: usuario.twitter,
          biografia: usuario.biografia,
          email: usuario.novoEmail,
          senha: hashedPassword
        }
      })
    }

    // eslint-disable-next-line no-unused-vars
    const user = await prisma.users.update({
      where: {
        id: usuario.id
      },
      data: {
        nickname: usuario.nickname,
        nome: usuario.nome,
        dt_nascimento: usuario.dt_nascimento + "T00:00:00.000Z",
        instagram: usuario.instagram,
        tiktok: usuario.tiktok,
        twitter: usuario.twitter,
        biografia: usuario.biografia,
        email: usuario.novoEmail
      }
    })

    return res.status(201).json({ message: "ok" })
  }
}
