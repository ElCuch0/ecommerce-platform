import prisma from "../../infrastructure/database/prisma.js";

export async function findAll() {
  return prisma.product.findMany({
    orderBy: {
      id: "desc"
    },
    where: {
      isActive: true,

      category: {
        isActive: true
      }
    }
  });
}

export async function findById(id) {
  return prisma.product.findFirst({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      reference: true,
      price: true,
      isActive: true,


      category: {
        select: {
          id: true,
          isActive: true
        }
      },
      inventory: {
        select: {
          stock: true
        }
      }
    }
  });
}

export async function findByReference(reference) {
  return prisma.product.findUnique({
    where: {
      reference
    }
  })
}

export async function create(data) {
  const result = prisma.$transaction(async (tx) => {

    const newProduct = await tx.product.create({
      data
    })

    const newInventory = await tx.inventory.create({
      data: {
        productId: newProduct.id,
        stock: 0,
        minimumStock: 0
      }
    })

    return {...newProduct, inventory: newInventory}
  })

  return result
}

export async function update(id, data) {
  return prisma.product.update({
    where: {
      id
    },
    data
  });
}

export async function deactivate(id) {
  return prisma.product.update({
    where: {
      id
    },
    data: {
      isActive: false
    }
  });
}

export async function activate(id) {
  return prisma.product.update({
    where: {
      id
    },
    data: {
      isActive: true
    }
  })
}
