import prisma from "../../infrastructure/database/prisma.js"

export async function create(data) {
  return await prisma.invoice.create({
    data
  })
}

export async function findById(id) {
  return await prisma.invoice.findUnique({
    where: {
      id
    },
    include: {
      order: {
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  reference: true
                }
              }
            }
          }
        }
      }
    }
  })
}

export async function findByOrderId(orderId) {
  return await prisma.invoice.findUnique({
    where: {
      orderId
    },
    include: {
      order: {
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  reference: true
                }
              }
            }
          }
        }
      }
    }
  })
}

export async function findAll() {
  return await prisma.invoice.findMany({
    include: {
      order: {
        select: {
          id: true,
          userId: true,
          total: true,
          status: true,
          createdAt: true
        }
      }
    },
    orderBy: {
      issueDate: "desc"
    }
  })
}
