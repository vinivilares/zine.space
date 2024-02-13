import { hashPassword } from "../../../../lib/auth"
import { prisma } from "../../../../lib/prisma"

// import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  // const prisma = new PrismaClient()
  if (req.method === "POST") {
    const data = req.body
    const { nickname, nome, dt_nascimento, email, password, repeatPassowrd } =
      data

    const inputData = dt_nascimento
    const inputDate = new Date(inputData)
    const currentDate = new Date()

    // Ajusta a data atual para o início do dia (00:00:00)
    currentDate.setHours(0, 0, 0, 0)

    if (inputDate > currentDate) {
      res.status(422).json({ message: "A data não pode ser futura" })
      return
    }

    // Verificando se o nickname já foi utilizado
    const existingUser = await prisma.users.findFirst({
      where: { nickname: nickname }
    })

    if (existingUser) {
      res.status(422).json({ message: "Nickname já utilizado!" })
      return
    }

    // Verificando se o email já foi utilizado
    const existingEmail = await prisma.users.findFirst({
      where: { email: email }
    })

    if (existingEmail) {
      res.status(422).json({ message: "Email já utilizado!" })
      return
    }

    // Verifica se email é válido
    if (!email || !email.includes("@")) {
      res.status(422).json({
        message: "Dados inválidos - Email inválido"
      })
      return
    }

    // Verifica tamanho da senha
    if (!password || password.trim().length < 7) {
      res.status(422).json({
        message: "Dados inválidos - Senha deve possuir no mínimo 7 caracteres"
      })
      return
    }

    // Verifica se as senhas são iguais
    if (password !== repeatPassowrd) {
      res.status(422).json({
        message: "Dados inválidos - As senhas devem ser iguais"
      })
      return
    }

    const hashedPassword = await hashPassword(password)

    // eslint-disable-next-line no-unused-vars
    const user = await prisma.users.create({
      data: {
        nickname: nickname,
        nome: nome,
        dt_nascimento: dt_nascimento + "T00:00:00.000Z",
        email: email,
        senha: hashedPassword
      }
    })

    res.status(201).json({ message: "Usuário Criado!" })
  }
}
