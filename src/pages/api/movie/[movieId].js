// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "../../../../lib/prisma"

// import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  // const prisma = new PrismaClient()
  const { movieId } = req.query
  const { movie, local, usuarioLogado } = req.body

  if (req.method === "GET") {
    res.status(401).json({ message: "Hello" })
  }

  if (req.method === "POST") {
    const assistiram = await prisma.users.findMany({
      where: {
        seguidores: {
          some: {
            email: usuarioLogado
          }
        },
        Assistidos: {
          some: { idFilme: movieId }
        }
      },
      select: {
        Assistidos: true,
        id: true,
        nickname: true,
        nome: true,
        imagem: true
      }
    })

    const recomendam = await prisma.users.findMany({
      where: {
        seguidores: {
          some: {
            email: usuarioLogado
          }
        },
        Recomendados: {
          some: { idFilme: movieId }
        }
      },
      select: {
        Assistidos: true,
        id: true,
        nickname: true,
        nome: true,
        imagem: true
      }
    })

    return res.status(200).json({
      assistiram: assistiram,
      recomendam: recomendam
    })
  }

  if (req.method === "PUT") {
    if (local === "assistidos") {
      const assistiu = await prisma.assistidos.findFirst({
        where: {
          idFilme: movie,
          AND: { idUser: { some: { id: usuarioLogado } } }
        }
      })

      if (assistiu) {
        // Se já assistiu remove dos assistidos
        const filme = await prisma.assistidos.update({
          where: { idFilme: movie },
          data: {
            idUser: {
              disconnect: {
                id: usuarioLogado
              }
            }
          }
        })
      } else {
        const querVer = await prisma.querVer.findFirst({
          where: {
            idFilme: movie,
            AND: { idUser: { some: { id: usuarioLogado } } }
          }
        })
        if (querVer) {
          const filme = await prisma.querVer.update({
            where: { idFilme: movie },
            data: {
              idUser: {
                disconnect: {
                  id: usuarioLogado
                }
              }
            }
          })
        }

        const filme = await prisma.assistidos.upsert({
          where: { idFilme: movie },
          update: {
            idUser: {
              connect: { id: usuarioLogado }
            }
          },
          create: {
            idFilme: movie,
            idUser: {
              connect: { id: usuarioLogado }
            }
          }
        })
      }
    }

    if (local === "querVer") {
      const querVer = await prisma.querVer.findFirst({
        where: {
          idFilme: movie,
          AND: { idUser: { some: { id: usuarioLogado } } }
        }
      })
      if (querVer) {
        const filme = await prisma.querVer.update({
          where: { idFilme: movie },
          data: {
            idUser: {
              disconnect: {
                id: usuarioLogado
              }
            }
          }
        })
      } else {
        const filme = await prisma.querVer.upsert({
          where: { idFilme: movie },
          update: {
            idUser: {
              connect: { id: usuarioLogado }
            }
          },
          create: {
            idFilme: movie,
            idUser: {
              connect: { id: usuarioLogado }
            }
          }
        })
      }
    }

    if (local === "recomendados") {
      const recomendados = await prisma.recomendados.findFirst({
        where: {
          idFilme: movie,
          AND: { idUser: { some: { id: usuarioLogado } } }
        }
      })

      if (recomendados) {
        const filme = await prisma.recomendados.update({
          where: { idFilme: movie },
          data: {
            idUser: {
              disconnect: {
                id: usuarioLogado
              }
            }
          }
        })
      } else {
        const querVer = await prisma.querVer.findFirst({
          where: {
            idFilme: movie,
            AND: { idUser: { some: { id: usuarioLogado } } }
          }
        })
        if (querVer) {
          const filme = await prisma.querVer.update({
            where: { idFilme: movie },
            data: {
              idUser: {
                disconnect: {
                  id: usuarioLogado
                }
              }
            }
          })
        }

        const filme = await prisma.recomendados.upsert({
          where: { idFilme: movie },
          update: {
            idUser: {
              connect: { id: usuarioLogado }
            }
          },
          create: {
            idFilme: movie,
            idUser: {
              connect: { id: usuarioLogado }
            }
          }
        })
      }
    }

    if (local === "naoRecomenda") {
      const naoRecomenda = await prisma.naoRecomendados.findFirst({
        where: {
          idFilme: movie,
          AND: { idUser: { some: { id: usuarioLogado } } }
        }
      })

      if (naoRecomenda) {
        const filme = await prisma.naoRecomendados.update({
          where: { idFilme: movie },
          data: {
            idUser: {
              disconnect: {
                id: usuarioLogado
              }
            }
          }
        })
      } else {
        const querVer = await prisma.querVer.findFirst({
          where: {
            idFilme: movie,
            AND: { idUser: { some: { id: usuarioLogado } } }
          }
        })
        if (querVer) {
          const filme = await prisma.querVer.update({
            where: { idFilme: movie },
            data: {
              idUser: {
                disconnect: {
                  id: usuarioLogado
                }
              }
            }
          })
        }

        const filme = await prisma.naoRecomendados.upsert({
          where: { idFilme: movie },
          update: {
            idUser: {
              connect: { id: usuarioLogado }
            }
          },
          create: {
            idFilme: movie,
            idUser: {
              connect: { id: usuarioLogado }
            }
          }
        })
      }
    }

    return res.status(201).json("OK")
  }
}
