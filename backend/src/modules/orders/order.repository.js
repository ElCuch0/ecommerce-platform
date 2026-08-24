import prisma from "../../infrastructure/database/prisma.js";

export async function create(data) {
  return prisma.order.create({
    data
  })
}

export async function findById(id) {
  return prisma.order.findUnique({
    where: {
      id
    },
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
      },
      invoice: true
    }
  })
}

export async function findByUserId(userId) {
  return prisma.order.findFirst({
    where: {
      userId
    },
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
      },
      invoice: true
    }
  })
}

export async function findAll() {
  return prisma.order.findMany({
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
      },
      user: {
        select: {
          id: true,
          name: true,
          lastname: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })
}

export async function updateStatus(id, status) {
  return prisma.order.update({
    where: {
      id
    },
    data: {
      status
    }
  })
}
